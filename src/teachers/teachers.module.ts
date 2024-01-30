import { Module } from '@nestjs/common';
import { TeachersService } from './teachers.service';
import { TeachersController } from './teachers.controller';
import { LessonsService } from 'src/lessons/lessons.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Teacher, TeacherSchema } from './schemas/teacher.schema';
import { Lesson, LessonSchema } from 'src/lessons/schemas/lesson.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Teacher.name, schema: TeacherSchema },
      { name: Lesson.name, schema: LessonSchema },
    ]),
  ],
  controllers: [TeachersController],
  providers: [TeachersService, LessonsService],
  exports: [TeachersService],
})
export class TeachersModule {}
