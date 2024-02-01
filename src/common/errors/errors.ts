import { HttpException, HttpStatus } from '@nestjs/common';

enum KEYS {
  USER_DOES_NOT_EXIST = 'USER_DOES_NOT_EXIST',
  USER_WITH_THIS_EMAIL_ALREADY_EXISTS = 'USER_WITH_THIS_EMAIL_ALREADY_EXISTS',
  INVALID_PASSWORD = 'INVALID_PASSWORD',
  TEACHER_DOES_NOT_EXIST = 'TEACHER_DOES_NOT_EXIST',
  TEACHER_WITH_THIS_EMAIL_ALREADY_EXISTS = 'TEACHER_WITH_THIS_EMAIL_ALREADY_EXISTS',
  LESSON_DOES_NOT_EXIST = 'LESSON_DOES_NOT_EXIST',
}

export enum CODES {
  INVALID_MONGOID = 1,
  USER_IS_NOT_EXISTS = 2,
}

export enum TEXTS {
  USER_DOES_NOT_EXIST = 'User does not exist',
  USER_WITH_THIS_EMAIL_ALREADY_EXISTS = 'User with this email already exists',
  INVALID_PASSWORD = 'Invalid password',
  TEACHER_DOES_NOT_EXIST = 'Teacher does not exist',
  TEACHER_WITH_THIS_EMAIL_ALREADY_EXISTS = 'Teacher with this email already exists',
  LESSON_DOES_NOT_EXIST = 'Lesson is not exist',
}

export class ValidationException extends HttpException {
  code: number;
  key: KEYS;

  constructor(type: string) {
    super('BAD_REQUEST', HttpStatus.BAD_REQUEST);
    this.message = TEXTS[type];
    this.code = CODES[type] || 0;
    this.key = KEYS[type];
  }
}

export const ERRORS = {
  USER_DOES_NOT_EXIST: new ValidationException('USER_DOES_NOT_EXIST'),
  USER_WITH_THIS_EMAIL_ALREADY_EXISTS: new ValidationException(
    'USER_WITH_THIS_EMAIL_ALREADY_EXISTS',
  ),
  TEACHER_WITH_THIS_EMAIL_ALREADY_EXISTS: new ValidationException(
    'TEACHER_WITH_THIS_EMAIL_ALREADY_EXISTS',
  ),
  INVALID_PASSWORD: new ValidationException('INVALID_PASSWORD'),
  TEACHER_DOES_NOT_EXIST: new ValidationException('TEACHER_DOES_NOT_EXIST'),
  LESSON_DOES_NOT_EXIST: new ValidationException('LESSON_DOES_NOT_EXIST'),
};

export const getContextCode = (code: CODES): { context: { code: number } } => ({
  context: { code },
});
