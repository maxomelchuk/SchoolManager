import { Module, forwardRef } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user.schema';
import { RolesModule } from 'src/roles/roles.module';
import { AuthModule } from 'src/auth/auth.module';
import { LessonsService } from 'src/lessons/lessons.service';
import { Lesson, LessonSchema } from 'src/lessons/schemas/lesson.schema';
import { LessonsModule } from 'src/lessons/lessons.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Lesson.name, schema: LessonSchema },
    ]),
    RolesModule,
    LessonsModule,
    forwardRef(() => AuthModule),
  ],
  controllers: [UsersController],
  providers: [UsersService, LessonsService],
  exports: [UsersService],
})
export class UsersModule {}
