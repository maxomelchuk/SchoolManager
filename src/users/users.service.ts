import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import mongoose, { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';
import { RolesService } from 'src/roles/roles.service';
import { ROLES } from 'src/roles/roles';
import { successResponse } from 'src/common/functions';
import { ERRORS } from 'src/common/errors';
import * as bcrypt from 'bcrypt';
import { DELETE_TYPE } from './constants';
import { LessonsService } from 'src/lessons/lessons.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
    private rolesService: RolesService,
    private lessonsService: LessonsService,
  ) {}

  async createUser(dto: CreateUserDto) {
    const user = await new this.userModel({
      ...dto,
      role: ROLES.USER,
      created_at: new Date(),
      _id: new mongoose.Types.ObjectId(),
    });
    await user.save();
    return user;
  }

  async getAllUsers() {
    const users = await this.userModel.find().populate('role');
    return users;
  }

  async getUserByEmail(email: string) {
    const user = await this.userModel.findOne({ email: email });
    if (!user) throw ERRORS.USER_IS_NOT_EXISTS;
    return user;
  }

  async getUserById(id: string) {
    const user = await this.userModel.findById(id);
    if (!user) throw ERRORS.USER_IS_NOT_EXISTS;
    return user;
  }

  async updateUser(id: string, dto: UpdateUserDto) {
    const user = await this.getUserById(id);
    const dataToUpdate = {};
    switch (true) {
      case dto.name !== undefined:
        dataToUpdate['name'] = dto.name;
      case dto.surname !== undefined:
        dataToUpdate['surname'] = dto.surname;
      case dto.birthDate !== undefined:
        dataToUpdate['birth_date'] = new Date(dto.birthDate);
      case dto.email !== undefined && user.email !== dto.email:
        const isEmailExist = await this.getUserByEmail(dto.email);
        if (isEmailExist) throw ERRORS.USER_WITH_THIS_EMAIL_ALREADY_EXISTS;
        dataToUpdate['email'] = dto.email;
      case dto.newPassword !== undefined && dto.newPassword !== dto.password:
        const isEqual = await bcrypt.compare(user.password, dto.password);
        if (!isEqual) throw ERRORS.INVALID_PASSWORD;
        dataToUpdate['password'] = bcrypt.hash(dto.newPassword, 5);
    }
    await this.userModel.updateOne({ _id: user._id }, { $set: dataToUpdate });
    return successResponse(true);
  }

  async deleteUser(id: string, type: DELETE_TYPE) {
    const user = await this.getUserById(id);
    switch (type) {
      case DELETE_TYPE.SOFT:
        await this.userModel.updateOne(
          { _id: user._id },
          { $set: { is_active: false, remove_date: new Date() } },
        );
        break;
      case DELETE_TYPE.HARD:
        await this.userModel.deleteOne({ _id: user._id });
        await this.lessonsService.deleteLessons(id);
        break;
    }
  }
}
