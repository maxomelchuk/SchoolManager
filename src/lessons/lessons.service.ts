import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Lesson, LessonDocument } from './schemas/lesson.schema';
import mongoose, { Model, Types } from 'mongoose';
import { successResponse } from 'src/common/functions';
import { LESSONS_BODY } from './dto/lessons.dto';
import { ERRORS } from 'src/common/errors';

@Injectable()
export class LessonsService {
  constructor(
    @InjectModel(Lesson.name)
    private lessonModel: Model<LessonDocument>,
  ) {}
  async createLesson(dto: LESSONS_BODY.Create) {
    const lesson = await new this.lessonModel({
      ...dto,
      created_at: new Date(),
      _id: new mongoose.Types.ObjectId(),
    });
    await lesson.save();
    return lesson;
  }

  async getAllLessons() {
    const lessons = await this.lessonModel.find();
    return lessons;
  }

  async getLessonById(id: string) {
    const lesson = await this.lessonModel.findById(id);
    if (!lesson) throw ERRORS.LESSON_DOES_NOT_EXIST;
    return lesson;
  }

  async updateLesson(id: string, dto: LESSONS_BODY.Update) {
    const lesson = await this.getLessonById(id);
    await this.lessonModel.updateOne({ _id: lesson._id }, { $set: dto });
    return successResponse(true);
  }

  async deleteLesson(id: string) {
    const lesson = await this.getLessonById(id);
    await this.lessonModel.deleteOne({ _id: lesson._id });
  }
}
