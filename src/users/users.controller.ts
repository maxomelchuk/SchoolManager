import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto, UserResponse } from './dto/user.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Roles } from 'src/auth/roles-auth.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { AddRoleDto } from './dto/user-role.dto';
import { ApiOperation, ApiResponse, ApiTags, ApiBody } from '@nestjs/swagger';
import { ROLES } from 'src/roles/roles';
import { User } from './schemas/user.schema';
import { SuccessResponse } from 'src/common/dto';

@ApiTags('Users')
@Controller('api')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Roles(ROLES.USER, ROLES.ADMIN, ROLES.DEVELOPER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({
    status: 200,
    description: 'List of users',
    type: [UserResponse],
  })
  @Get('/users')
  getAllUsers() {
    return this.usersService.getAllUsers();
  }

  @Roles(ROLES.USER, ROLES.ADMIN, ROLES.DEVELOPER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiOperation({ summary: 'Get user info' })
  @ApiResponse({
    status: 200,
    description: 'User info',
    type: [UserResponse],
  })
  @Get('/users/:id')
  getUser(@Param('id') id: string) {
    return this.usersService.getUserById(id);
  }

  @Roles(ROLES.USER, ROLES.ADMIN, ROLES.DEVELOPER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiOperation({ summary: 'Update user' })
  @ApiBody({
    type: UpdateUserDto,
  })
  @ApiResponse({
    status: 201,
    description: 'Update user',
    type: SuccessResponse,
  })
  @Put('/users/:id')
  updateUser(@Param('id') id: string, @Body() userDto: UpdateUserDto) {
    return this.usersService.updateUser(id, userDto);
  }
}
