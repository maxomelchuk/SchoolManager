import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Put,
  Query,
} from '@nestjs/common';
import { TeachersService } from './teachers.service';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Roles } from 'src/auth/roles-auth.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { ROLES } from 'src/roles/roles';
import { TEACHER_BODY, TEACHER_RESPONSE } from './dto/teacher.dto';
import { SuccessResponse } from 'src/common/dto';
import { DELETE_TYPE } from 'src/common/constants';

@ApiTags('Teachers')
@Controller('/api')
export class TeachersController {
  constructor(private readonly teachersService: TeachersService) {}

  @Roles(ROLES.ADMIN, ROLES.DEVELOPER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiOperation({ summary: 'Get all teachers' })
  @ApiResponse({
    status: 200,
    description: 'List of teachers',
    type: [TEACHER_RESPONSE.Teacher],
  })
  @Get('/teachers')
  getAllTeachers() {
    return this.teachersService.getAllTeachers();
  }

  @Roles(ROLES.ADMIN, ROLES.DEVELOPER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiOperation({ summary: 'Get teacher info' })
  @ApiResponse({
    status: 200,
    description: 'Teacher info',
    type: TEACHER_RESPONSE.Teacher,
  })
  @Get('/teachers/:id')
  getTeacher(@Param('id') id: string) {
    return this.teachersService.getTeacherById(id);
  }

  @Roles(ROLES.ADMIN, ROLES.DEVELOPER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiOperation({ summary: 'Update teacher' })
  @ApiBody({
    type: TEACHER_BODY.Update,
  })
  @ApiResponse({
    status: 201,
    description: 'Update teacher',
    type: SuccessResponse,
  })
  @Put('/teachers/:id')
  updateTeacher(
    @Param('id') id: string,
    @Body() teacherDto: TEACHER_BODY.Update,
  ) {
    return this.teachersService.updateTeacher(id, teacherDto);
  }

  @Roles(ROLES.ADMIN, ROLES.DEVELOPER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiOperation({ summary: 'Delete teacher' })
  @ApiResponse({
    status: 201,
    description: 'Delete teacher',
    type: SuccessResponse,
  })
  @Delete('/teachers/:id')
  deleteTeacher(@Param('id') id: string, @Query('type') type: DELETE_TYPE) {
    return this.teachersService.deleteTeacher(id, type);
  }
}
