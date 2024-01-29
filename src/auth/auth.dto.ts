import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, MaxLength, MinLength } from 'class-validator';

export class AuthResponse {
  @ApiProperty()
  token: string;
}

export class LoginBody {
  @ApiProperty({ example: 'some-mail@mail.com', required: true })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'some-password', required: true })
  @MaxLength(16)
  @MinLength(4)
  password: string;
}
