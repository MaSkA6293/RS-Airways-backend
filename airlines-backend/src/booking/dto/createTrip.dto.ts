import { Type } from 'class-transformer';
import {
  IsDefined,
  IsNotEmptyObject,
  IsObject,
  Length,
  ValidateNested,
} from 'class-validator';
import { FlightEntity } from 'src/flight/entities/flight.entity';
import { ApiProperty } from '@nestjs/swagger';
import { CreatePassengersDto } from './create-passengers.dto';

export class CreateTripDto {
  @ApiProperty({
    example: {
      adults: [
        {
          firstName: 'John',
          lastName: 'Doe',
          gender: 'male',
          dateOfBirth: '1987-11-06T21:00:00.000Z',
          specialAssistance: false,
          baggage: {
            light: 1,
            medium: 1,
            heavy: 0,
          },
        },
      ],
      children: [],
      infants: [],
    },
    description: 'Passengers',
  })
  @IsDefined()
  @IsNotEmptyObject()
  @IsObject()
  @ValidateNested()
  @Type(() => CreatePassengersDto)
  passengers: CreatePassengersDto;

  @ApiProperty({
    example: [
      {
        id: '0a35dd62-e09f-444b-a628-f4e7c6954f57',
        takeOffDate: '2024-02-20T16:30:00.000Z',
        landingDate: '2024-02-20T20:15:00.000Z',
        flightDuration: 225,
        seatsAvailable: 20,
        seatsTotal: 400,
        price: {
          flight: {
            eur: 12,
            usd: 15,
            rub: 1400,
            pln: 400,
          },
          specialAssistance: {
            eur: 5,
            usd: 4,
            rub: 400,
            pln: 100,
          },
          baggage: {
            light: {
              eur: 5,
              usd: 4,
              rub: 400,
              pln: 100,
            },
            medium: {
              eur: 5,
              usd: 4,
              rub: 400,
              pln: 100,
            },
            heavy: { eur: 5, usd: 4, rub: 400, pln: 100 },
          },
        },
      },
    ],
    description: 'Flights, (minLength: 1, maxLength: 2)',
  })
  @IsDefined()
  @IsNotEmptyObject()
  @IsObject()
  @Length(1, 2)
  @ValidateNested()
  @Type(() => FlightEntity)
  flights: FlightEntity[];
}
