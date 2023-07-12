import { Type } from 'class-transformer';
import {
  IsArray,
  IsDefined,
  IsNotEmpty,
  ValidateNested,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { CreateTripDto } from './createTrip.dto';

export class CreateOrderDto {
  @ApiProperty({
    example: [
      {
        passengers: {
          adult: [
            {
              firstName: 'John',
              lastName: 'Doe',
              gender: 'male',
              dateOfBirth: '1987-11-06T21:00:00.000Z',
              specialAssistance: false,
              baggage: {
                light: 1,
                medium: 1,
              },
            },
          ],
        },
        flights: [
          '0a35dd62-e09f-444b-a628-f4e7c6954f57',
          '0a35dd62-e09f-444b-a628-f4e7c6954f58',
        ],
      },
    ],

    description: 'Order',
  })
  @IsDefined()
  @IsArray()
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => CreateTripDto)
  order: Array<CreateTripDto>;
}
