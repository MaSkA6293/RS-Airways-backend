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
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { SearchFlightDto } from './dto/search-flight.dto';
import { FlightEntity } from './entities/flight.entity';
import { FlightService } from './flight.service';
import { CreateFlightDto } from './dto/create-flight.dto';
import { FlightIsExistPipe } from './flight.isExist.pipe';
import { FlightModel } from './models/flight-model';
import { notFoundError } from 'src/utils';
import { entity } from 'src/interfaces/interfaces';
import { GetFlightsModel } from './models/getFlights-model';
import { GetAllFlightsDto } from './dto/get-all-flights.dto';
import { GetAllFlightsModel } from './models/get-all-flights.model';

@ApiTags('Flight')
@Controller('flight')
export class FlightController {
  constructor(private flightService: FlightService) {}

  @ApiOperation({ summary: 'Search Flights' })
  @ApiResponse({ status: 200, type: [FlightModel] })
  @Post()
  @HttpCode(HttpStatus.OK)
  async search(@Body() query: SearchFlightDto): Promise<GetFlightsModel> {
    const flights = await this.flightService.getFlights(query);

    if (!flights) {
      throw new HttpException(
        'One of the airports was not found',
        HttpStatus.NOT_FOUND,
      );
    }
    return flights;
  }

  @ApiOperation({ summary: 'Get all flights' })
  @ApiResponse({ status: 200, type: [FlightModel] })
  @Post('/all-flights')
  @HttpCode(HttpStatus.OK)
  async searchAll(
    @Body() params: GetAllFlightsDto,
  ): Promise<GetAllFlightsModel> {
    return await this.flightService.getAllFlights(params);
  }

  @ApiOperation({ summary: 'Get the flight by id' })
  @ApiResponse({ status: 200, type: FlightModel })
  @ApiParam({ type: 'String', name: 'uuid' })
  @Get(':uuid')
  @HttpCode(HttpStatus.OK)
  async findById(
    @Param('uuid', ParseUUIDPipe, FlightIsExistPipe) flight: FlightEntity,
  ): Promise<FlightEntity | undefined> {
    if (flight) return flight;

    return notFoundError(entity.flight);
  }

  @ApiOperation({ summary: 'Create a new flight' })
  @ApiOkResponse({ status: 201, type: FlightModel })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'The flight with this id, does not exist',
  })
  @Post('create')
  @HttpCode(201)
  async create(@Body() createFlightDto: CreateFlightDto): Promise<FlightModel> {
    const flight = await this.flightService.create(createFlightDto);
    if (!flight) {
      throw new HttpException(
        'One of the airports was not found',
        HttpStatus.NOT_FOUND,
      );
    }
    return flight;
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
  @ApiParam({ type: 'String', name: 'uuid' })
  @Delete(':uuid')
  @HttpCode(204)
  async remove(
    @Param('uuid', ParseUUIDPipe, FlightIsExistPipe) flight: FlightEntity,
  ): Promise<void> {
    return await this.flightService.remove(flight.id);
  }
}
