import { ApiProperty } from '@nestjs/swagger';
import { Trip } from './trip.model';

export class OrderModel {
  @ApiProperty({
    example: '26bb1722-38dd-42eb-b6fa-6cae47c5b585',
    description: 'Unique id',
  })
  id: string;

  @ApiProperty({
    example: [
      {
        passengers: 'Passenger[]',
        flights: 'FlightEntity[]',
        totalPrice: 'TotalPrice',
      },
    ],
    description: 'All trips that was booked in one payment',
  })
  order: Trip[];
}
