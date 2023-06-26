import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { CreateAirportDto } from '../dto/create-airport.dto';
import { FlightEntity } from '../../flight/entities/flight.entity';

@Entity('airport')
export class AirportEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    nullable: false,
  })
  key: string;

  @Column({
    nullable: false,
  })
  name: string;

  @Column({
    nullable: false,
  })
  country: string;

  @Column({
    nullable: false,
  })
  city: string;

  @Column({
    nullable: false,
  })
  gmt: string;

  @Column({
    nullable: false,
  })
  gps: string;

  @OneToMany(() => FlightEntity, (flight) => flight.from, { cascade: true })
  flightsFrom: FlightEntity[];

  @OneToMany(() => FlightEntity, (flight) => flight.to, { cascade: true })
  flightsTo: FlightEntity[];

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
