import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { AirportEntity } from '../../airport/entities/airport.entity';
import { v4 as uuidv4 } from 'uuid';
import { CreateFlightDto } from '../dto/create-flight.dto';
import { getFlightDuration, getPrice } from '../../utils';

@Entity('flight')
export class FlightEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    nullable: false,
  })
  takeOffDate: Date;

  @Column({
    nullable: false,
  })
  landingDate: Date;

  @Column({
    nullable: false,
  })
  flightDuration: number;

  @Column({
    nullable: false,
  })
  seatsAvailable: number;

  @Column({
    nullable: false,
  })
  seatsTotal: number;

  @Column({
    nullable: false,
  })
  price: string;

  @ManyToOne(() => AirportEntity, (airport) => airport.flightsFrom, {
    onDelete: 'CASCADE',
  })
  from: AirportEntity;

  @ManyToOne(() => AirportEntity, (airport) => airport.flightsTo, {
    onDelete: 'CASCADE',
  })
  to: AirportEntity;

  create(
    createFlightDto: CreateFlightDto,
    airports: { from: AirportEntity; to: AirportEntity },
    landingDate: string,
    flightDuration: number,
  ) {
    this.id = uuidv4();

    this.from = airports.from;

    this.to = airports.to;

    this.takeOffDate = new Date(createFlightDto.takeOffDate);

    this.landingDate = new Date(landingDate);

    this.flightDuration = Math.floor(flightDuration * 60);

    this.seatsAvailable = createFlightDto.seatsAvailable;

    this.seatsTotal = createFlightDto.seatsTotal;

    this.price = getPrice(
      getFlightDuration(airports.from.gps, airports.to.gps),
    );

    return this;
  }

  getDistance(a: string, b: string) {
    const [lat1, lon1] = a.split(',');
    const [lat2, lon2] = b.split(',');

    const p = Math.PI / 180;
    const data =
      0.5 -
      Math.cos((Number(lat2) - Number(lat1)) * p) / 2 +
      (Math.cos(Number(lat1) * p) *
        Math.cos(Number(lat2) * p) *
        (1 - Math.cos((Number(lon2) - Number(lon1)) * p))) /
        2;

    return 12742 * Math.asin(Math.sqrt(data));
  }
}
