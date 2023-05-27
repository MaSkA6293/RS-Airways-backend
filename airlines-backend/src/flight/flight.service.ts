import { Injectable } from '@nestjs/common';
import { Between, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { FlightEntity } from './entities/flight.entity';
import { SearchFlightDto } from './dto/search-flight.dto';
import { CreateFlightDto } from './dto/create-flight.dto';
import { AirportService } from 'src/airport/airport.service';
import * as moment from 'moment';
import { MOCK_FLIGHT_DAYS, PLANE_SPEED, SEATS_TOTAL } from './constants';
import { getPrice, getRandomIntInclusive } from 'src/utils/utils';
import { AirportEntity } from 'src/airport/entities/airport.entity';

@Injectable()
export class FlightService {
  constructor(
    @InjectRepository(FlightEntity)
    private flightRepository: Repository<FlightEntity>,
    private airportService: AirportService,
  ) {}

  async getAllFlights(): Promise<FlightEntity[]> {
    return await this.flightRepository.find({
      relations: {
        from: true,
        to: true,
      },
    });
  }

  async getFlights(query: SearchFlightDto): Promise<any> {
    const airports = await this.getAirports(query.fromId, query.toId);

    if (!airports) return undefined;

    if (query.backDate) {
      const f = this.selectFlights(query.fromId, query.forwardDate);
      const b = this.selectFlights(query.toId, query.backDate);

      const [forwards, backwards] = await Promise.all([f, b]);

      return { forwards, backwards };
    }
    const forwards = await this.selectFlights(query.fromId, query.forwardDate);
    return { forwards };
  }

  async selectFlights(from: string, data: string) {
    const dataStart = new Date(moment(new Date(data)).format('MM-DD-YYYY'));
    const dataEnd = moment(new Date(dataStart)).add(1, 'day').toDate();

    const result = await this.flightRepository.find({
      relations: {
        from: true,
        to: true,
      },
      where: {
        takeOffDate: Between(dataStart, dataEnd),
        from: { id: from },
      },
    });
    return result;
  }

  async getAirports(fromId: string, toId: string) {
    const airports = await this.airportService.getAirportsById(fromId, toId);

    if (airports.from && airports.to) return airports;

    return undefined;
  }

  async create(createFlightDto: CreateFlightDto): Promise<any> {
    const airports = await this.getAirports(
      createFlightDto.fromId,
      createFlightDto.toId,
    );

    if (!airports) return undefined;

    const distance = new FlightEntity().getDistance(
      airports.from.gps,
      airports.to.gps,
    );

    const flightDuration = distance / PLANE_SPEED;

    const landingDate = moment(new Date(createFlightDto.takeOffDate))
      .add(flightDuration, 'hours')
      .format();

    const flight = new FlightEntity().create(
      createFlightDto,
      airports,
      landingDate,
      flightDuration,
    );

    return await this.flightRepository.save(flight);
  }

  async createMock() {
    const airports: AirportEntity[] = await this.airportService.findAll();

    if (airports) {
      const promiseArr = airports.reduce((prev, curr, index, arr) => {
        const promArr = [];

        let next = arr[index + 1];
        if (index + 1 > arr.length - 1) {
          next = arr[0];
        }

        const duration =
          new FlightEntity().getDistance(curr.gps, next.gps) / PLANE_SPEED;

        for (let i = 0; i < MOCK_FLIGHT_DAYS; i++) {
          const data = {
            fromId: curr.id,
            toId: next.id,
            takeOffDate: moment(new Date()).add(i, 'days').toDate(),
            seatsAvailable: getRandomIntInclusive(0, SEATS_TOTAL),
            seatsTotal: SEATS_TOTAL,
            price: getPrice(duration),
          } as CreateFlightDto;

          promArr.push(this.create(data));
        }
        return [...prev, promArr];
      }, []);

      const data = await Promise.all(promiseArr);

      return data;
    }
    return undefined;
  }
}
