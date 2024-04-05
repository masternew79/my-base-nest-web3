import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsOptional,
  IsAlphanumeric,
  IsString,
  IsEnum,
  IsNotEmpty,
} from 'class-validator';

export class PaginationDto {
  @ApiProperty({
    type: Number,
    default: 10
  })
  @IsOptional()
  @Transform(({ value }) => {
    return Number(value)
  })
  limit?: number;

  @ApiProperty({
    type: Number,
    default: 1
  })
  @IsOptional()
  @Transform(({ value }) => {
    return Number(value)
  })
  page?: number;
}

