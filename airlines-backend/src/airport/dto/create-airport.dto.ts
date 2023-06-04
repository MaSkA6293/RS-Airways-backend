import { OmitType } from '@nestjs/mapped-types';
import { IsString, IsNotEmpty, Length } from 'class-validator';
import { AirportEntity } from '../entities/airport.entity';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAirportDto extends OmitType(AirportEntity, ['id']) {
  @ApiProperty({
    example: 'ORY',
    description: "Airport's contraction name",
  })
  @IsString()
  @IsNotEmpty()
  @Length(3, 5)
  key: string;

  @ApiProperty({
    example: 'Belp',
    description: 'Airport name',
  })
  @IsString()
  @IsNotEmpty()
  @Length(3, 15)
  name: string;

  @ApiProperty({
    example: 'Switzerland',
    description: 'Country name',
  })
  @IsString()
  @IsNotEmpty()
  @Length(4, 15)
  country: string;

  @ApiProperty({
    example: 'Berne',
    description: 'City name',
  })
  @IsString()
  @IsNotEmpty()
  @Length(4, 15)
  city: string;

  @ApiProperty({
    example: '+1.0',
    description: 'The time difference',
  })
  @IsString()
  @IsNotEmpty()
  gmt: string;

  @ApiProperty({
    example: '12.1,22.10',
    description: "Airport's gps coordinates",
  })
  @IsString()
  @IsNotEmpty()
  gps: string;
}
