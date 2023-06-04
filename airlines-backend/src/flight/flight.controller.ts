import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  ParseUUIDPipe,
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
import { FlightIsExistPipe } from './flight.isExist.pipe';

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

  @ApiOperation({ summary: 'Get the flight by id' })
  @ApiResponse({ status: 200, type: [FlightEntity] })
  @Get()
  @Get(':uuid')
  findById(
    @Param('uuid', ParseUUIDPipe, FlightIsExistPipe) flight: FlightEntity,
  ): FlightEntity {
    return flight;
  }

  @ApiOperation({ summary: 'Create a new flight' })
  @ApiOkResponse({ status: 201, type: [FlightEntity] })
  @Post('create')
  @HttpCode(201)
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

  @ApiOperation({ summary: 'Remove an flight by id' })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'The record was deleted successfully',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'The airport with this id, does not exist',
  })
  @Delete(':uuid')
  @HttpCode(204)
  async remove(
    @Param('uuid', ParseUUIDPipe, FlightIsExistPipe) flight: FlightEntity,
  ): Promise<void> {
    return await this.flightService.remove(flight.id);
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
