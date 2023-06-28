import { Injectable } from '@nestjs/common';
import { Between, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { FlightEntity } from './entities/flight.entity';
import { SearchFlightDto } from './dto/search-flight.dto';
import { CreateFlightDto } from './dto/create-flight.dto';
import { AirportService } from 'src/airport/airport.service';
import * as moment from 'moment';
import { MOCK_FLIGHT_DAYS, SEATS_TOTAL } from './constants';
import {
  getFlightDuration,
  getPrice,
  getRandomDate,
  getRandomIntInclusive,
} from 'src/utils';
import { AirportEntity } from 'src/airport/entities/airport.entity';
import { GetFlightsModel } from './models/getFlights-model';

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

  async getFlights(query: SearchFlightDto): Promise<GetFlightsModel> {
    const airports = await this.getAirports(query.fromId, query.toId);

    if (!airports) return undefined;

    if (query.backDate) {
      const {
        fromId,
        forwardDate,
        forwardRange,
        backwardRange,
        toId,
        backDate,
      } = query;
      const f = this.selectFlights(fromId, forwardDate, toId, forwardRange);
      const b = this.selectFlights(toId, backDate, fromId, backwardRange);

      const [forwards, backwards] = await Promise.all([f, b]);

      return { forwards, backwards };
    }
    const { fromId, forwardDate, toId, backwardRange } = query;
    const forwards = await this.selectFlights(
      fromId,
      forwardDate,
      toId,
      backwardRange,
    );
    return { forwards };
  }

  async selectFlights(from: string, data: string, to: string, range = 1) {
    const dataStart = new Date(moment(new Date(data)).format('MM-DD-YYYY'));
    const dataEnd = moment(new Date(dataStart)).add(range, 'day').toDate();

    const result = await this.flightRepository.find({
      relations: {
        from: true,
        to: true,
      },
      where: {
        takeOffDate: Between(dataStart, dataEnd),
        from: { id: from },
        to: { id: to },
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

    const flightDuration = getFlightDuration(
      airports.from.gps,
      airports.to.gps,
    );

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
      const flightsArr = airports.reduce((prev, curr, index, arr) => {
        const promArr = [];

        for (let i = 0; i < arr.length; i++) {
          if (i === index) {
            continue;
          }

          for (let j = 0; j < MOCK_FLIGHT_DAYS; j++) {
            const createFlightDto = {
              fromId: curr.id,
              toId: arr[i].id,
              takeOffDate: moment(getRandomDate()).add(j, 'days').toDate(),
              seatsAvailable: getRandomIntInclusive(0, SEATS_TOTAL),
              seatsTotal: SEATS_TOTAL,
              price: getPrice(getFlightDuration(curr.gps, arr[i].gps)),
            } as CreateFlightDto;

            promArr.push(this.create(createFlightDto));
          }
        }
        return [...prev, promArr];
      }, []);

      return await Promise.all(flightsArr);
    }
    return undefined;
  }

  async remove(id: string): Promise<void> {
    await this.flightRepository.delete(id);
  }

  async getFlightById(id: string): Promise<FlightEntity | undefined> {
    const flight = await this.flightRepository.findOne({ where: { id } });

    if (!flight) return undefined;

    return flight;
  }
}
