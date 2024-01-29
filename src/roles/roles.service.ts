import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Roles, RolesDocument } from './schemas/roles.schema';
import { CreateRoleDto } from './dto/roles.dto';
import { successResponse } from 'src/common/functions';

@Injectable()
export class RolesService {
  constructor(
    @InjectModel(Roles.name)
    private rolesModel: Model<RolesDocument>,
  ) {}

  async createRole(dto: CreateRoleDto) {
    await this.rolesModel.create(dto);
    return successResponse(true);
  }

  async getRoleByName(roleName: string) {
    const role = await this.rolesModel.findOne({ role: roleName });
    return role;
  }

  async getRoleById(id: string) {
    const role = await this.rolesModel.findById(id);
    return role;
  }

  async getRoles() {
    const roles = await this.rolesModel.find();
    return roles;
  }
}
