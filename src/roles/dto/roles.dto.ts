import { ApiProperty } from '@nestjs/swagger';

export class CreateRoleDto {
  @ApiProperty()
  role: string;

  @ApiProperty()
  description: string;
}
