import { ApiProperty } from '@nestjs/swagger';
import { FlightEntity } from '../entities/flight.entity';

export class GetFlightsModel {
  @ApiProperty({
    example: 'FlightEntity',
    description: 'Forward flights',
  })
  forwards: FlightEntity[];

  @ApiProperty({
    example: 'FlightEntity',
    description: 'Backward flights',
  })
  backwards?: FlightEntity[];
}
