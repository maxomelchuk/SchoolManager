import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import * as mongoose from 'mongoose';
import { User } from 'src/users/schemas/user.schema';
export type RolesDocument = HydratedDocument<Roles>;

@Schema()
export class Roles {
  @Prop({ required: false, type: mongoose.Schema.Types.ObjectId })
  _id: mongoose.Schema.Types.ObjectId;

  @Prop()
  role: string;

  @Prop()
  description: string;
}

export const RolesSchema = SchemaFactory.createForClass(Roles);
