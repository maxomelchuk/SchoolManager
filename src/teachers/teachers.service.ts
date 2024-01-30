import { Injectable } from '@nestjs/common';
import { TEACHER_BODY } from './dto/teacher.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Teacher, TeacherDocument } from './schemas/teacher.schema';
import mongoose, { Model } from 'mongoose';
import { ROLES } from 'src/roles/roles';
import { ERRORS } from 'src/common/errors';
import * as bcrypt from 'bcrypt';
import { successResponse } from 'src/common/functions';
import { LessonsService } from 'src/lessons/lessons.service';
import { DELETE_TYPE } from 'src/common/constants';

@Injectable()
export class TeachersService {
  constructor(
    @InjectModel(Teacher.name)
    private teacherModel: Model<TeacherDocument>,
    private lessonsService: LessonsService,
  ) {}
  async createTeacher(dto: TEACHER_BODY.Create) {
    const teacher = await new this.teacherModel({
      ...dto,
      role: ROLES.TEACHER,
      created_at: new Date(),
      _id: new mongoose.Types.ObjectId(),
    });
    await teacher.save();
    return teacher;
  }

  async getAllTeachers() {
    const teachers = await this.teacherModel.find({}, { password: 0 });
    return teachers;
  }

  async getTeacherByEmail(email: string) {
    const teacher = await this.teacherModel.findOne({ email: email });
    if (!teacher) throw ERRORS.TEACHER_IS_NOT_EXISTS;
    return teacher;
  }

  async getTeacherById(id: string) {
    const teacher = await this.teacherModel.findById(id);
    if (!teacher) throw ERRORS.TEACHER_IS_NOT_EXISTS;
    return teacher;
  }

  async updateTeacher(id: string, dto: TEACHER_BODY.Update) {
    const teacher = await this.getTeacherById(id);
    const dataToUpdate = {};
    switch (true) {
      case dto.name !== undefined:
        dataToUpdate['name'] = dto.name;
      case dto.surname !== undefined:
        dataToUpdate['surname'] = dto.surname;
      case dto.birthDate !== undefined:
        dataToUpdate['birth_date'] = new Date(dto.birthDate);
      case dto.email !== undefined && teacher.email !== dto.email:
        const isEmailExist = await this.getTeacherByEmail(dto.email);
        if (isEmailExist) throw ERRORS.TEACHER_WITH_THIS_EMAIL_ALREADY_EXISTS;
        dataToUpdate['email'] = dto.email;
      case dto.newPassword !== undefined && dto.newPassword !== dto.password:
        const isEqual = await bcrypt.compare(teacher.password, dto.password);
        if (!isEqual) throw ERRORS.INVALID_PASSWORD;
        dataToUpdate['password'] = bcrypt.hash(dto.newPassword, 5);
    }
    await this.teacherModel.updateOne(
      { _id: teacher._id },
      { $set: dataToUpdate },
    );
    return successResponse(true);
  }

  async deleteTeacher(id: string, type: DELETE_TYPE) {
    const teacher = await this.getTeacherById(id);
    switch (type) {
      case DELETE_TYPE.SOFT:
        await this.teacherModel.updateOne(
          { _id: teacher._id },
          { $set: { is_active: false, remove_date: new Date() } },
        );
        break;
      case DELETE_TYPE.HARD:
        await this.teacherModel.deleteOne({ _id: teacher._id });
        break;
    }
  }
}
