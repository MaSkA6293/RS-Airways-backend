import { Type } from 'class-transformer';
import {
  IsArray,
  IsDefined,
  IsNotEmptyObject,
  IsObject,
  ValidateNested,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { CreatePassengersDto } from './create-passengers.dto';

export class CreateTripDto {
  @ApiProperty({
    example: {
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
            heavy: 1,
          },
        },
      ],
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
      '0a35dd62-e09f-444b-a628-f4e7c6954f57',
      '0a35dd62-e09f-444b-a628-f4e7c6954f58',
    ],

    description: 'Flights Ids',
  })
  @IsDefined()
  @IsArray()
  @Type(() => String)
  flights: string[];
}
