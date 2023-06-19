import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { AirportEntity } from 'src/airport/entities/airport.entity';
import { FlightPriceList } from './flight-price-list.model';

@Entity('flight')
export class FlightModel {
  @ApiProperty({
    example: '1361f75f-9092-41a1-8bc7-bbd7aec51da6',
    description: 'Unique id',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    example: '2024-02-20T16:30:00.000Z',
    description: 'TakeOff date and time',
  })
  @Column({
    nullable: false,
  })
  takeOffDate: Date;

  @ApiProperty({
    example: '2024-02-20T20:15:00.000Z',
    description: 'Landing date and time',
  })
  @Column({
    nullable: false,
  })
  landingDate: Date;

  @ApiProperty({
    example: 225,
    description: 'All flight in minutes',
  })
  @Column({
    nullable: false,
  })
  flightDuration: number;

  @ApiProperty({
    example: 105,
    description: 'The quantity of the available seats',
  })
  @Column({
    nullable: false,
  })
  seatsAvailable: number;

  @ApiProperty({ example: 10, description: 'The quantity of the free seats' })
  @Column({
    nullable: false,
  })
  seatsTotal: number;

  @ApiProperty({ example: 150, description: 'The trip price' })
  @Column({
    nullable: false,
  })
  price: FlightPriceList;

  @ManyToOne(() => AirportEntity, (airport) => airport.flightsFrom, {
    onDelete: 'CASCADE',
  })
  from: AirportEntity;

  @ManyToOne(() => AirportEntity, (airport) => airport.flightsTo, {
    onDelete: 'CASCADE',
  })
  to: AirportEntity;
}
