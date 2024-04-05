import { ApiProperty } from '@nestjs/swagger';
import { Equals, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { getTodayInterval } from 'src/utils/helper';
import { Status } from '../enum/status.enum';
import { Status as StatusType } from '../constant/status';

export class CreateAirdropDto {
  @ApiProperty({
    type: Number,
    required: true,
    default: 1,
  })
  @IsNumber()
  @IsNotEmpty()
  idDao: number;

  @ApiProperty({
    type: String,
    required: true,
    default: 'KAS',
  })
  @IsString()
  @IsNotEmpty()
  tokenSymbol: string;

  @ApiProperty({
    type: String,
    required: true,
    default: 'Kaspa',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    type: String,
    required: true,
    default: '',
  })
  @IsString()
  imageUrl: string;

  @ApiProperty({
    type: String,
    required: true,
    default: Status.Ongoing,
  })
  @IsString()
  @IsNotEmpty()
  status: StatusType;

  @ApiProperty({
    type: Number,
    required: true,
    default: 0,
  })
  @IsNumber()
  total: number;
}
