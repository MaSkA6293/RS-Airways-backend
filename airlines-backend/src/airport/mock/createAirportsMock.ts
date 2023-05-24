import * as airports from './airports.json';
import { AirportService } from '../airport.service';
import { CreateAirportDto } from '../dto/create-airport.dto';

export const createMockAirports = async (airportService: AirportService) => {
  airports.forEach((el: CreateAirportDto) => {
    airportService.create(el);
  });
};
