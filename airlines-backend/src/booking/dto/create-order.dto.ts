import { Type } from 'class-transformer';
import {
  IsDefined,
  IsNotEmptyObject,
  IsObject,
  ValidateNested,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { CreateTripDto } from './createTrip.dto';

export class CreateOrderDto {
  @ApiProperty({
    example: {
      order: [
        {
          passengers: {
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
          flights: [
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
        },
      ],
    },

    description: 'Order',
  })
  @IsDefined()
  @IsNotEmptyObject()
  @IsObject()
  @ValidateNested()
  @Type(() => CreateTripDto)
  order: CreateTripDto[];
}
