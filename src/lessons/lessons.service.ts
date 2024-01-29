import { Injectable } from '@nestjs/common';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Lesson, LessonDocument } from './schemas/lesson.schema';
import mongoose, { Model, Types } from 'mongoose';
import { successResponse } from 'src/common/functions';

@Injectable()
export class LessonsService {
  constructor(
    @InjectModel(Lesson.name)
    private lessonModel: Model<LessonDocument>,
  ) {}
  create(createLessonDto: CreateLessonDto) {
    return;
  }

  findAll() {
    return;
  }

  findOne(id: number) {
    return;
  }

  update(id: number, updateLessonDto: UpdateLessonDto) {
    return;
  }

  async deleteLesson(id: string) {
    await this.lessonModel.deleteOne({ _id: new Types.ObjectId(id) });
    return successResponse();
  }

  async deleteLessons(studentId: string | Types.ObjectId) {
    if (typeof studentId === 'string')
      studentId = new Types.ObjectId(studentId);
    await this.lessonModel.deleteMany({
      student: studentId,
    });
    return successResponse();
  }
}
