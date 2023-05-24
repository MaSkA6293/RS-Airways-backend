import { OmitType } from '@nestjs/mapped-types';
import { IsString, IsNotEmpty } from 'class-validator';
import { AirportEntity } from '../entities/airport.entity';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAirportDto extends OmitType(AirportEntity, ['id']) {
  @ApiProperty({
    example: 'ORY',
    description: "Airport's contraction name",
  })
  @IsString()
  @IsNotEmpty({ message: 'request body does not contain required field Key' })
  key: string;

  @ApiProperty({
    example: 'Belp',
    description: 'Airport name',
  })
  @IsString()
  @IsNotEmpty({ message: 'request body does not contain required field Name' })
  name: string;

  @ApiProperty({
    example: 'Switzerland',
    description: 'Country name',
  })
  @IsString()
  @IsNotEmpty({
    message: 'request body does not contain required field Country',
  })
  country: string;

  @ApiProperty({
    example: 'Berne',
    description: 'City name',
  })
  @IsString()
  @IsNotEmpty({ message: 'request body does not contain required field City' })
  city: string;

  @ApiProperty({
    example: '+1.0',
    description: 'The time difference',
  })
  @IsString()
  @IsNotEmpty({ message: 'request body does not contain required field GMT' })
  gmt: string;

  @ApiProperty({
    example: '12.1,22.10',
    description: "Airport's gps coordinates",
  })
  @IsString()
  @IsNotEmpty({ message: 'request body does not contain required field GPS' })
  gps: string;
}
