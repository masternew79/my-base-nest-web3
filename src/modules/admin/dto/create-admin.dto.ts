// export class CreateAdminDto {}

import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNotEmpty, MinLength, IsString } from 'class-validator';

export class CreateAdminDto {
  @ApiProperty({
    type: String,
    minLength: 5,
    required: true,
    default: 'admin',
  })
  @Transform(({ value }) => {
    return value.toLowerCase();
  })
  @IsNotEmpty()
  @MinLength(5)
  username: string;

  @ApiProperty({
    type: String,
    minLength: 6,
    required: true,
    default: '123456',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @ApiProperty({
    type: String,
    minLength: 5,
    required: true,
    default: '',
  })
  @IsString()
  name?: string;

  @ApiProperty({
    type: String,
    minLength: 5,
    required: true,
    default: 'secret',
  })
  @IsNotEmpty()
  @MinLength(5)
  secret: string;
}
