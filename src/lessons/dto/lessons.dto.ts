import { ApiProperty } from '@nestjs/swagger';
import {
  IsOptional,
  IsString,
  MinLength,
  MaxLength,
  IsNumber,
} from 'class-validator';
import { LESSON_CATEGORY } from 'src/common/constants';

export namespace LESSONS_BODY {
  export class Create {
    @ApiProperty({ example: 'Piano lesson (standart)', required: true })
    @IsString()
    @MinLength(3)
    @MaxLength(100)
    title: string;

    @ApiProperty({ example: 'some-description', required: true })
    @IsString()
    @MinLength(10)
    @MaxLength(1000)
    description: string;

    @ApiProperty({ example: 450, required: true })
    @IsNumber()
    price: number;

    @ApiProperty({ example: 'USD' })
    @IsString()
    @MinLength(1)
    @MaxLength(1000)
    currency: string;

    @ApiProperty({ example: 45 })
    @IsNumber()
    duration: number;

    @ApiProperty({ example: LESSON_CATEGORY.SINGLE })
    @IsString()
    @MinLength(1)
    @MaxLength(1000)
    category: LESSON_CATEGORY;
  }

  export class Update {
    @ApiProperty({ example: 'Piano lesson (standart)' })
    @IsString()
    @MinLength(3)
    @MaxLength(100)
    @IsOptional()
    title: string;

    @ApiProperty({ example: 'some-description' })
    @IsString()
    @MinLength(10)
    @MaxLength(1000)
    @IsOptional()
    description: string;

    @ApiProperty({ example: 450 })
    @IsNumber()
    @IsOptional()
    price: number;

    @ApiProperty({ example: 'USD' })
    @IsString()
    @MinLength(1)
    @MaxLength(1000)
    @IsOptional()
    currency: string;

    @ApiProperty({ example: 45 })
    @IsNumber()
    @IsOptional()
    duration: number;

    @ApiProperty({ example: LESSON_CATEGORY.SINGLE })
    @IsString()
    @MinLength(1)
    @MaxLength(1000)
    @IsOptional()
    category: LESSON_CATEGORY;
  }
}

export namespace LESSONS_RESPONSE {
  export class Lesson {
    @ApiProperty({ example: '64a26010f0ba3aa7da88810a' })
    _id: string;

    @ApiProperty({ example: 'Piano lesson (standart)' })
    title: string;

    @ApiProperty({ example: 'some-description' })
    description: string;

    @ApiProperty({ example: 450 })
    price: number;

    @ApiProperty({ example: 'USD' })
    currency: string;

    @ApiProperty({ example: 45 })
    duration: number;

    @ApiProperty({ example: LESSON_CATEGORY.SINGLE })
    category: LESSON_CATEGORY;
  }
}
