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

export class SignUpDto {
  // @ApiProperty({
  //   type: String,
  //   minLength: 10,
  //   required: true,
  // })
  // @IsNotEmpty()
  // @IsNumberString()
  // @Length(10)
  // phone: string;

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
    minLength: 6,
    required: true,
    default: '123456',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  confirmPassword?: string;

  @ApiProperty({
    type: String,
    minLength: 3,
    required: true,
    default: 'User 1',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  fullname: string;

  @ApiProperty({
    type: String,
    minLength: 3,
  })
  @IsString()
  @IsOptional()
  refCode: string;
}

export class SendActivateCodeDto {
  @ApiProperty({
    type: String,
    minLength: 10,
    required: true,
  })
  @IsNotEmpty()
  @IsNumberString()
  @Length(10)
  phone: string;
}

export class ActivateAccountDto {
  @ApiProperty({
    type: String,
    minLength: 10,
    required: true,
  })
  @IsNotEmpty()
  @IsNumberString()
  @Length(10)
  phone: string;

  @ApiProperty({
    type: String,
    minLength: 4,
    maxLength: 4,
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  @Length(4)
  code: string;
}

export class CheckAvailablePhoneDto {
  @ApiProperty({
    type: String,
    minLength: 10,
    required: true,
  })
  @IsNotEmpty()
  @IsNumberString()
  @Length(10)
  phone: string;
}
