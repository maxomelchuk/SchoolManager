import {
  Injectable,
  Dependencies,
  UnauthorizedException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { USER_BODY } from 'src/users/dto/user.dto';
import * as bcrypt from 'bcrypt';
import { AUTH_BODY } from './auth.dto';

@Dependencies(UsersService, JwtService)
@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(userDto: AUTH_BODY.Login) {
    const user = await this.validateUser(userDto);
    return this.generateToken(user);
  }

  async registration(userDto: USER_BODY.Create) {
    const candidate = await this.usersService.getUserByEmail(userDto.email);
    if (candidate) {
      throw new HttpException('User is already exist', HttpStatus.BAD_REQUEST);
    }
    const hashPassword = await bcrypt.hash(userDto.password, 5);

    const user = await this.usersService.createUser({
      ...userDto,
      password: hashPassword,
    });
    return this.generateToken(user);
  }

  async generateToken(user) {
    const payload = { email: user.email, _id: user._id, role: user.role };
    return {
      token: this.jwtService.sign(payload),
    };
  }

  async validateUser(userDto: USER_BODY.Create) {
    const user = await this.usersService.getUserByEmail(userDto.email);
    const passwordEquals = await this.comparePassword(
      userDto.password,
      user.password,
    );

    if (user && passwordEquals) {
      return user;
    }
    throw new UnauthorizedException({ message: 'Incorrect email or password' });
  }

  async comparePassword(password, incomingPassword) {
    return bcrypt.compare(incomingPassword, password);
  }
}
