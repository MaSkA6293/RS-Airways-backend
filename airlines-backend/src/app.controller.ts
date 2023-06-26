import {
  Controller,
  Delete,
  Get,
  HttpCode,
  InternalServerErrorException,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { createMockAirports } from './airport/mock/createAirportsMock';
import { AirportService } from './airport/airport.service';
import { FlightService } from './flight/flight.service';
import * as airports from './airport/mock/airports.json';

@ApiTags('Root')
@Controller()
export class AppController {
  constructor(
    private airportsService: AirportService,
    private flightService: FlightService,
  ) {}

  @ApiOperation({ summary: 'Create mock airports and flights' })
  @ApiResponse({ status: 201, type: String })
  @Get('createMockData')
  @HttpCode(201)
  async createMock(): Promise<string> {
    const createdAirports = await Promise.all(
      airports.map(async ({ gps }) => {
        return await this.airportsService.findOneByGPS(gps);
      }),
    );

    if (createdAirports.every((i) => (i ? true : false))) {
      return "You've already created data!";
    }

    const mockAirports = await createMockAirports(this.airportsService);
    const mockFlights = await this.flightService.createMock();

    if (mockAirports && mockFlights) {
      return 'The mock data has been created successfully';
    }

    throw new InternalServerErrorException();
  }

  @ApiOperation({ summary: 'Remove all the airports and flights' })
  @ApiResponse({ status: 200, type: String })
  @Delete('removeMockData')
  @HttpCode(200)
  async removeMockData(): Promise<string> {
    await this.airportsService.removeAll();

    return 'The data has been removed successfully';
  }
}
