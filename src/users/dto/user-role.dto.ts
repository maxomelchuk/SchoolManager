import { ApiProperty } from '@nestjs/swagger';

export class AddRoleDto {
  @ApiProperty()
  readonly value: string;

  @ApiProperty()
  readonly userId: string;
}
