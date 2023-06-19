import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsDefined,
  IsISO8601,
  IsNotEmpty,
  IsNotEmptyObject,
  IsObject,
  IsString,
  Length,
  Validate,
  ValidateNested,
} from 'class-validator';
import { CustomGenderValidator } from 'src/user/CustomGenderValidator';
import { Type } from 'class-transformer';
import { PassengerBaggage } from '../models/passenger-baggage.model';

export class CreatePassengerDto {
  @ApiProperty({
    example: 'John',
    description: 'First name',
  })
  @IsNotEmpty()
  @IsString()
  @Length(3, 10)
  firstName: string;

  @ApiProperty({
    example: 'Doe',
    description: 'Last name',
  })
  @IsNotEmpty()
  @IsString()
  @Length(3, 10)
  lastName: string;

  @ApiProperty({
    example: 'male',
    description: 'Gender - male or female',
  })
  @IsNotEmpty()
  @IsString()
  @Validate(CustomGenderValidator)
  gender: string;

  @ApiProperty({
    example: '1987-11-06T21:00:00.000Z',
    description: 'Date of birthday ISO8601',
  })
  @IsNotEmpty()
  @IsISO8601()
  dateOfBirth: Date;

  @ApiProperty({
    example: false,
    description: 'Need special assistance?',
  })
  @IsNotEmpty()
  @IsBoolean()
  specialAssistance: boolean;

  @ApiProperty({
    example: true,
    description: 'Baggage is included',
  })
  @IsDefined()
  @IsNotEmptyObject()
  @IsObject()
  @ValidateNested()
  @Type(() => PassengerBaggage)
  baggage: PassengerBaggage;
}
