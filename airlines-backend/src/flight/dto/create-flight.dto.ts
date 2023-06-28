import { ApiProperty, OmitType } from '@nestjs/swagger';
import { FlightEntity } from '../entities/flight.entity';
import { IsNotEmpty, IsNumber, IsString, IsUUID } from 'class-validator';

export class CreateFlightDto extends OmitType(FlightEntity, ['id']) {
  @ApiProperty({
    example: '1361f75f-9092-41a1-8bc7-bbd7aec51da6',
    description: 'Unique airport id',
  })
  @IsString()
  @IsNotEmpty()
  @IsUUID()
  fromId: string;

  @ApiProperty({
    example: '1361f75f-9092-41a1-8bc7-bbd7aec51da9',
    description: 'Unique airport id',
  })
  @IsString()
  @IsNotEmpty()
  @IsUUID()
  toId: string;

  @ApiProperty({
    example: '2024-02-20T16:30:00.000Z',
    description: 'TakeOff date',
  })
  @IsString()
  @IsNotEmpty()
  takeOffDate: Date;

  @ApiProperty({
    example: 105,
    description: 'The quantity of the available seats',
  })
  @IsNumber()
  @IsNotEmpty()
  seatsAvailable: number;

  @ApiProperty({ example: 10, description: 'The quantity of the free seats' })
  @IsNumber()
  @IsNotEmpty()
  seatsTotal: number;
}
