import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsEmail, IsString } from 'class-validator';
import { ObjectId } from 'mongodb';

export class UserResponse {
  @ApiProperty({ example: '64a26010f0ba3aa7da88810a' })
  _id: ObjectId;

  @ApiProperty({ example: 'some-mail@mail.com' })
  email: string;

  @ApiProperty({ example: 'some-password' })
  password: string;

  @ApiProperty({ example: ['user'] })
  role: string;
}

export class CreateUserDto {
  @ApiProperty({ example: 'some-mail@mail.com', required: true })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'some-password', required: true })
  password: string;
}

export class UpdateUserDto {
  @ApiProperty({ example: 'some-mail@mail.com' })
  @IsOptional()
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'some-password' })
  @IsOptional()
  password: string;

  @ApiProperty({ example: 'some-password' })
  @IsOptional()
  newPassword: string;

  @ApiProperty({ example: 'Alex' })
  @IsOptional()
  @IsString()
  name: string;

  @ApiProperty({ example: 'Smith' })
  @IsOptional()
  @IsString()
  surname: string;

  @ApiProperty({ example: '2023-12-03T09:48:00.000Z' })
  @IsOptional()
  @IsString()
  birthDate: string;
}
