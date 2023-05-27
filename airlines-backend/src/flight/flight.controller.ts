import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import {
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { SearchFlightDto } from './dto/search-flight.dto';
import { FlightEntity } from './entities/flight.entity';
import { FlightService } from './flight.service';
import { CreateFlightDto } from './dto/create-flight.dto';

@ApiTags('Flight')
@Controller('flight')
export class FlightController {
  constructor(private flightService: FlightService) {}

  @ApiOperation({ summary: 'Search Flights' })
  @ApiResponse({ status: 201, type: [FlightEntity] })
  @Post()
  async search(@Body() query: SearchFlightDto) {
    const flights = await this.flightService.getFlights(query);

    if (!flights) {
      throw new HttpException(
        'One of the airports is not found',
        HttpStatus.NOT_FOUND,
      );
    }
    return flights;
  }

  @ApiOperation({ summary: 'Get all flights' })
  @ApiResponse({ status: 201, type: [FlightEntity] })
  @Get('all')
  searchAll() {
    return this.flightService.getAllFlights();
  }

  @ApiOperation({ summary: 'Create a new flight' })
  @ApiOkResponse({ status: 201, type: [FlightEntity] })
  @Post('create')
  async create(
    @Body() createFlightDto: CreateFlightDto,
  ): Promise<FlightEntity> {
    const createdFlight = await this.flightService.create(createFlightDto);
    if (!createdFlight) {
      throw new HttpException(
        'One of the airports is not found',
        HttpStatus.NOT_FOUND,
      );
    }
    return createdFlight;
  }

  @ApiOperation({ summary: 'Generate mock flights' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The mock records were successfully created',
  })
  @HttpCode(201)
  @Get('mock')
  async createMockFlights(): Promise<string> {
    await this.flightService.createMock();
    return 'success';
  }
}
