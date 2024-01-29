import { Injectable } from '@nestjs/common';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';

@Injectable()
export class TeachersService {
  create(createTeacherDto: CreateTeacherDto) {
    return;
  }

  findAll() {
    return;
  }

  findOne(id: number) {
    return;
  }

  update(id: number, updateTeacherDto: UpdateTeacherDto) {
    return;
  }

  remove(id: number) {
    return;
  }
}
