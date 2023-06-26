import { ApiProperty } from '@nestjs/swagger';

export class AirportModel {
  @ApiProperty({
    example: '1361f75f-9092-41a1-8bc7-bbd7aec51da6',
    description: 'Unique id',
  })
  id: string;

  @ApiProperty({
    example: 'ORY',
    description: "Airport's contraction name",
  })
  key: string;

  @ApiProperty({
    example: 'Belp',
    description: 'Airport name',
  })
  name: string;

  @ApiProperty({
    example: 'Switzerland',
    description: 'Country name',
  })
  country: string;

  @ApiProperty({
    example: 'Berne',
    description: 'City name',
  })
  city: string;

  @ApiProperty({
    example: '+1.0',
    description: 'The time difference',
  })
  gmt: string;

  @ApiProperty({
    example: '12.1,22.10',
    description: "Airport's gps coordinates",
  })
  gps: string;
}
