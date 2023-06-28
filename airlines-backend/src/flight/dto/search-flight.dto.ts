import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  ValidateIf,
  IsUUID,
  IsNumber,
} from 'class-validator';

export class SearchFlightDto {
  @ApiProperty({
    example: '9d6de023-b00d-4949-8149-4ef0d0dc1d92',
    description: 'Unique id',
  })
  @IsNotEmpty()
  @IsString()
  @IsUUID()
  fromId: string;

  @ApiProperty({
    example: '32163c61-9465-4529-9823-8b5ed22c5af0',
    description: 'Unique id',
  })
  @IsNotEmpty()
  @IsString()
  @IsUUID()
  toId: string;

  @ApiProperty({
    example: '2023-07-01',
    description: 'TakeOff date',
  })
  @IsNotEmpty()
  @IsString()
  forwardDate: string;

  @ApiProperty({
    example: '2023-07-05',
    description: 'Landing date',
  })
  @ValidateIf((o) => o.otherProperty === 'undefined')
  @IsNotEmpty()
  backDate?: string;

  @ApiProperty({
    example: 2,
    description: 'Data range for searching',
    default: 1,
  })
  @ValidateIf((o) => o.otherProperty === 'undefined')
  @IsNotEmpty()
  @IsNumber()
  forwardRange?: number;

  @ApiProperty({
    example: 1,
    description: 'Data range for searching',
    default: 1,
  })
  @ValidateIf((o) => o.otherProperty === 'undefined')
  @IsNotEmpty()
  @IsNumber()
  backwardRange?: number;
}
