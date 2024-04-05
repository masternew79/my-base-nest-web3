import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsOptional,
  IsAlphanumeric,
  IsString,
  IsEnum,
  IsNotEmpty,
  MinLength,
  IsEmail,
  IsPhoneNumber,
  Length,
  IsNumberString,
} from 'class-validator';

export class LoginDto {
  @ApiProperty({
    type: String,
    minLength: 5,
    required: true,
    default: 'example@gmail.com',
  })
  @Transform(({ value }) => {
    return value.toLowerCase();
  })
  @IsNotEmpty()
  @MinLength(5)
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
    minLength: 5,
    required: true,
    default: '',
  })
  @IsString()
  fcmToken?: string;

  @ApiProperty({
    type: String,
    minLength: 5,
    required: true,
    default: '',
  })
  @IsString()
  apnToken?: string;
}

export class LoginGoogleDto {
  @ApiProperty({
    type: String,
    minLength: 5,
    required: true,
    default: '123456',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  googleTokenId: string;

  @ApiProperty({
    type: String,
    minLength: 5,
    required: true,
    default: '',
  })
  @IsString()
  fcmToken?: string;

  @ApiProperty({
    type: String,
    minLength: 5,
    required: true,
    default: '',
  })
  @IsString()
  apnToken?: string;
}

// export class LoginGoogleDto {
//   @ApiProperty({
//     type: String,
//     minLength: 5,
//     required: true,
//   })
//   @IsString()
//   @IsNotEmpty()
//   @MinLength(5)
//   googleAccessToken: string;

//   @ApiProperty({
//     type: String,
//     minLength: 5,
//   })
//   @IsString()
//   fcmToken?: string;
// }
