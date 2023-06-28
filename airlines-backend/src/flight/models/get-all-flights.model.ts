import { ApiProperty } from '@nestjs/swagger';
import { FlightEntity } from '../entities/flight.entity';

export class GetAllFlightsModel {
  @ApiProperty({
    example: 'FlightEntity[]',
    description: 'Forward flights',
  })
  data: FlightEntity[];

  @ApiProperty({
    example: '1000',
    description: 'Number of entities',
  })
  total: number;
}
