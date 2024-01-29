import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/roles.dto';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/auth/roles-auth.decorator';
import { ROLES } from './roles';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { SuccessResponse } from 'src/common/dto';

@ApiTags('Roles')
@Controller('api')
export class RolesController {
  constructor(private roleService: RolesService) {}

  @Roles(ROLES.USER, ROLES.ADMIN, ROLES.DEVELOPER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiOperation({ summary: 'Get roles' })
  @ApiResponse({ status: 200, type: SuccessResponse })
  @Get('/roles')
  async getAll() {
    return this.roleService.getRoles();
  }

  @Roles(ROLES.USER, ROLES.ADMIN, ROLES.DEVELOPER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiOperation({ summary: 'Get role by id' })
  @ApiResponse({ status: 200, type: SuccessResponse })
  @Get('/roles/:id')
  async getByValue(@Param('id') id: string) {
    return this.roleService.getRoleById(id);
  }

  @Roles(ROLES.USER, ROLES.ADMIN, ROLES.DEVELOPER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiOperation({ summary: 'Create role' })
  @ApiBody({
    type: CreateRoleDto,
  })
  @ApiResponse({ status: 201, type: SuccessResponse })
  @Post('/roles')
  async create(@Body() dto: CreateRoleDto) {
    return this.roleService.createRole(dto);
  }
}
