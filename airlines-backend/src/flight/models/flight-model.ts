import { ApiProperty } from '@nestjs/swagger';
import { Column } from 'typeorm';
import { FlightPriceList } from './flight-price-list.model';

export class FlightModel {
  @ApiProperty({
    example: '1361f75f-9092-41a1-8bc7-bbd7aec51da6',
    description: 'Unique id',
  })
  id: string;

  @ApiProperty({
    example: '2024-02-20T16:30:00.000Z',
    description: 'TakeOff date and time',
  })
  takeOffDate: Date;

  @ApiProperty({
    example: '2024-02-20T20:15:00.000Z',
    description: 'Landing date and time',
  })
  landingDate: Date;

  @ApiProperty({
    example: 225,
    description: 'All flight in minutes',
  })
  flightDuration: number;

  @ApiProperty({
    example: 105,
    description: 'The quantity of the available seats',
  })
  @Column({
    nullable: false,
  })
  seatsAvailable: number;

  @ApiProperty({ example: 10, description: 'The quantity of the free seats' })
  seatsTotal: number;

  @ApiProperty({
    example: {
      flight: {
        adult: {
          eur: 29,
          usd: 31,
          rub: 2610,
          pln: 131,
        },
        child: {
          eur: 20,
          usd: 22,
          rub: 1800,
          pln: 90,
        },
        infant: {
          eur: 5,
          usd: 5,
          rub: 450,
          pln: 23,
        },
      },
      specialAssistance: {
        eur: 1.16,
        usd: 1,
        rub: 104,
        pln: 5,
      },
      baggage: {
        light: {
          eur: 5,
          usd: 5,
          rub: 450,
          pln: 23,
        },
        medium: {
          eur: 10,
          usd: 11,
          rub: 900,
          pln: 45,
        },
        heavy: {
          eur: 13,
          usd: 14,
          rub: 1170,
          pln: 59,
        },
      },
    },
    description: 'The trip price',
  })
  price: FlightPriceList;
}
