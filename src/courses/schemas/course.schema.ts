import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { HydratedDocument } from 'mongoose';
import * as mongoose from 'mongoose';
export type CourseDocument = HydratedDocument<Course>;

@Schema({
  toObject: { virtuals: true, aliases: true, versionKey: false, getters: true },
  toJSON: { virtuals: true, aliases: true, versionKey: false, getters: true },
})
export class Course {
  @ApiProperty({ example: '64a26010f0ba3aa7da88810a' })
  @Prop({ required: false, type: mongoose.Schema.Types.ObjectId })
  _id: mongoose.Schema.Types.ObjectId;

  @ApiProperty()
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Teacher' })
  teacher: mongoose.Schema.Types.ObjectId;

  @ApiProperty()
  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] })
  students: mongoose.Schema.Types.ObjectId[];

  @ApiProperty({ example: 'Piano course' })
  @Prop()
  title: string;

  @ApiProperty({ example: 'This course provide...' })
  @Prop()
  description: string;

  @ApiProperty({ example: 99 })
  @Prop()
  price: number;

  @ApiProperty({ example: 'USD' })
  @Prop()
  currency: string;

  @ApiProperty({ example: 200 })
  @Prop()
  duration: number;

  @ApiProperty()
  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Lesson' }] })
  lessons: mongoose.Schema.Types.ObjectId[];
}

export const CourseSchema = SchemaFactory.createForClass(Course);
