import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class AdminLoginDto {
  @ApiProperty({
    type: String,
    minLength: 5,
    required: true,
    default: 'admin',
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
}
