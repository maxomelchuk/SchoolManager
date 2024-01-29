import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { HydratedDocument } from 'mongoose';
import * as mongoose from 'mongoose';
export type LessonDocument = HydratedDocument<Lesson>;

@Schema({
  toObject: { virtuals: true, aliases: true, versionKey: false, getters: true },
  toJSON: { virtuals: true, aliases: true, versionKey: false, getters: true },
})
export class Lesson {
  @ApiProperty({ example: '64a26010f0ba3aa7da88810a' })
  @Prop({ required: false, type: mongoose.Schema.Types.ObjectId })
  _id: mongoose.Schema.Types.ObjectId;

  @ApiProperty()
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Teacher' })
  teacher: mongoose.Schema.Types.ObjectId;

  @ApiProperty()
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  student: mongoose.Schema.Types.ObjectId;

  @ApiProperty({ example: 'Vocal' })
  @Prop()
  title: string;

  @ApiProperty({ example: 'Some notes' })
  @Prop()
  description: string;

  @ApiProperty({ example: 20 })
  @Prop()
  price: number;

  @ApiProperty({ example: 'USD' })
  @Prop()
  currency: string;

  @ApiProperty({ example: 45 })
  @Prop()
  duration: number;

  @ApiProperty({ example: '2023-12-03T09:48:00.000Z' })
  @Prop({ type: Date })
  start_date: Date;
}

export const LessonSchema = SchemaFactory.createForClass(Lesson);
