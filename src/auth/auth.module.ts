import { Module, forwardRef } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { TeachersService } from 'src/teachers/teachers.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/users/schemas/user.schema';
import { Teacher, TeacherSchema } from 'src/teachers/schemas/teacher.schema';
import { Lesson, LessonSchema } from 'src/lessons/schemas/lesson.schema';
import { LessonsService } from 'src/lessons/lessons.service';

@Module({
  imports: [
    forwardRef(() => UsersModule),
    JwtModule.register({
      global: true,
      secret: process.env.PRIVATE_KEY || 'SECRET',
      signOptions: { expiresIn: '300d' },
    }),
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Teacher.name, schema: TeacherSchema },
      { name: Lesson.name, schema: LessonSchema },
    ]),
  ],
  controllers: [AuthController],
  providers: [AuthService, TeachersService, LessonsService],
  exports: [AuthService, JwtModule],
})
export class AuthModule {}
