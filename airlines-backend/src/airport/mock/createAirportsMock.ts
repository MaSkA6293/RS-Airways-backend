import * as airports from './airports.json';
import { AirportService } from '../airport.service';
import { CreateAirportDto } from '../dto/create-airport.dto';
import { AirportEntity } from '../entities/airport.entity';

export const createMockAirports = async (airportService: AirportService) => {
  const promises: Promise<AirportEntity>[] = airports.map(
    (el: CreateAirportDto) => {
      return new Promise((res) => res(airportService.create(el)));
    },
  );
  return await Promise.all(promises);
};
