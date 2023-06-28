import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class GetAllFlightsDto {
  @ApiProperty({
    example: '20',
    description: 'number of flights per request',
    default: 20,
  })
  @IsNotEmpty()
  @IsNumber()
  perPage: number;

  @ApiProperty({
    example: '1',
    description: 'Page number',
    default: 1,
  })
  @IsNotEmpty()
  @IsNumber()
  page: number;
}
