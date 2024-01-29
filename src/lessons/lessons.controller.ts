import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { LessonsService } from './lessons.service';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';

@Controller('/api')
export class LessonsController {
  constructor(private readonly lessonsService: LessonsService) {}

  @Post('/lessons')
  create(@Body() createLessonDto: CreateLessonDto) {
    return this.lessonsService.create(createLessonDto);
  }

  @Get('/lessons')
  findAll() {
    return this.lessonsService.findAll();
  }

  @Get('/lessons/:id')
  findOne(@Param('id') id: string) {
    return this.lessonsService.findOne(+id);
  }

  @Patch('/lessons/:id')
  update(@Param('id') id: string, @Body() updateLessonDto: UpdateLessonDto) {
    return this.lessonsService.update(+id, updateLessonDto);
  }

  @Delete('lessons/:id')
  remove(@Param('id') id: string) {
    return this.lessonsService.deleteLesson(id);
  }
}
