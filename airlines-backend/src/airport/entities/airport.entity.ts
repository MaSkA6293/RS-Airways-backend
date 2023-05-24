import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { CreateAirportDto } from '../dto/create-airport.dto';

@Entity('airport')
export class AirportEntity {
  @ApiProperty({
    example: '1361f75f-9092-41a1-8bc7-bbd7aec51da6',
    description: 'Unique id',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    example: 'ORY',
    description: "Airport's contraction name",
  })
  @Column({
    nullable: false,
  })
  key: string;

  @ApiProperty({
    example: 'Belp',
    description: 'Airport name',
  })
  @Column({
    nullable: false,
  })
  name: string;

  @ApiProperty({
    example: 'Switzerland',
    description: 'Country name',
  })
  @Column({
    nullable: false,
  })
  country: string;

  @ApiProperty({
    example: 'Berne',
    description: 'City name',
  })
  @Column({
    nullable: false,
  })
  city: string;

  @ApiProperty({
    example: '+1.0',
    description: 'The time difference',
  })
  @Column({
    nullable: false,
  })
  gmt: string;

  @ApiProperty({
    example: '12.1,22.10',
    description: "Airport's gps coordinates",
  })
  @Column({
    nullable: false,
  })
  gps: string;

  create(createAirportDto: CreateAirportDto) {
    this.id = uuidv4();

    this.key = createAirportDto.key;
    this.gmt = createAirportDto.gmt;
    this.country = createAirportDto.country;
    this.city = createAirportDto.city;
    this.name = createAirportDto.name;
    this.gps = createAirportDto.gps;

    return this;
  }
}
