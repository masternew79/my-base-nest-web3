import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import {
  IsOptional,
  IsAlphanumeric,
  IsString,
  IsEnum,
  IsNotEmpty,
  MinLength,
  IsEmail,
  Length,
  Matches,
  IsPhoneNumber,
  IsNumberString,
  IsNumber,
} from 'class-validator';
import { Match } from 'src/utils/match.decorator';

export class ForgotPasswordDto {
  @ApiProperty({
    type: String,
    minLength: 5,
    required: true,
    default: 'example@gmail.com',
  })
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  @Transform(({ value }) => {
    return value.toLowerCase();
  })
  email: string;

  @ApiProperty({
    type: String,
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  @Transform(({ value }) => {
    return value.toUpperCase();
  })
  code: string;

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
}
