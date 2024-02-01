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
import { LessonsService } from './lessons.service';
import { Roles } from 'src/auth/roles-auth.decorator';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ROLES } from 'src/roles/roles';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { SuccessResponse } from 'src/common/dto';
import { LESSONS_BODY, LESSONS_RESPONSE } from './dto/lessons.dto';

@Controller('/api')
export class LessonsController {
  constructor(private readonly lessonsService: LessonsService) {}

  @Roles(ROLES.ADMIN, ROLES.DEVELOPER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiOperation({ summary: 'Get all lessons' })
  @ApiResponse({
    status: 200,
    description: 'List of lessons',
    type: [LESSONS_RESPONSE.Lesson],
  })
  @Get('/lessons')
  getAllLessons() {
    return this.lessonsService.getAllLessons();
  }

  @Roles(ROLES.ADMIN, ROLES.DEVELOPER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiOperation({ summary: 'Get lesson' })
  @ApiResponse({
    status: 200,
    description: 'Get lesson',
    type: LESSONS_RESPONSE.Lesson,
  })
  @Get('/lessons/:id')
  getLesson(@Param('id') id: string) {
    return this.lessonsService.getLessonById(id);
  }

  @Roles(ROLES.ADMIN, ROLES.DEVELOPER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiOperation({ summary: 'Update lesson' })
  @ApiBody({
    type: LESSONS_BODY.Update,
  })
  @ApiResponse({
    status: 201,
    description: 'Update lesson',
    type: SuccessResponse,
  })
  @Put('/lessons/:id')
  updateLesson(
    @Param('id') id: string,
    @Body() lessonDto: LESSONS_BODY.Update,
  ) {
    return this.lessonsService.updateLesson(id, lessonDto);
  }

  @Roles(ROLES.ADMIN, ROLES.DEVELOPER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiOperation({ summary: 'Delete lesson' })
  @ApiResponse({
    status: 201,
    description: 'Delete lesson',
    type: SuccessResponse,
  })
  @Delete('/lessons/:id')
  deleteLesson(@Param('id') id: string) {
    return this.lessonsService.deleteLesson(id);
  }
}
