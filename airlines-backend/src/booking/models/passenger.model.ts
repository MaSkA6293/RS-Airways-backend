import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsDefined,
  IsISO8601,
  IsNotEmpty,
  IsNotEmptyObject,
  IsObject,
  IsString,
  IsUUID,
  Length,
  Validate,
  ValidateNested,
} from 'class-validator';
import { CustomGenderValidator } from 'src/user/CustomGenderValidator';
import { PassengerBaggage } from './passenger-baggage.model';
import { Type } from 'class-transformer';
import { v4 as uuidv4 } from 'uuid';
import { CreatePassengerDto } from '../dto/create-passenger.dto';

export class Passenger {
  @ApiProperty({
    example: '0a35dd62-e09f-444b-a628-f4e7c6954f57',
    description: 'Unique id',
  })
  @IsNotEmpty()
  @IsString()
  @IsUUID()
  id: string;

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

  create(createPassengerDto: CreatePassengerDto): Passenger {
    const {
      firstName,
      lastName,
      gender,
      dateOfBirth,
      specialAssistance,
      baggage,
    } = createPassengerDto;

    this.id = uuidv4();
    this.firstName = firstName;
    this.lastName = lastName;
    this.gender = gender;
    this.dateOfBirth = new Date(dateOfBirth);
    this.specialAssistance = specialAssistance;
    this.baggage = baggage;

    return this;
  }
}
