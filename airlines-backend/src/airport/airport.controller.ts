import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import { AirportService } from './airport.service';
import { AirportEntity } from './entities/airport.entity';
import { CreateAirportDto } from './dto/create-airport.dto';
import { ApiOperation, ApiResponse, ApiTags, ApiParam } from '@nestjs/swagger';
import { AirportIsExistPipe } from './airport.isExist.pipe';
import { AirportModel } from './models/airport.model';
import { notFoundError } from 'src/utils';
import { entity } from 'src/interfaces/interfaces';

@Controller('airport')
@ApiTags('Airport')
export class AirportsController {
  constructor(private airportsService: AirportService) {}

  @ApiOperation({ summary: 'Get all the airports' })
  @ApiResponse({ status: 200, type: [AirportModel] })
  @Get()
  async getAll(): Promise<AirportEntity[] | []> {
    return this.airportsService.findAll();
  }

  @ApiOperation({ summary: 'Get the airport by id' })
  @ApiResponse({ status: 200, type: [AirportModel] })
  @ApiParam({ type: 'String', name: 'uuid' })
  @Get(':uuid')
  findById(
    @Param('uuid', ParseUUIDPipe, AirportIsExistPipe) airport: AirportEntity,
  ): AirportEntity {
    if (airport) return airport;
    return notFoundError(entity.airport);
  }

  @ApiOperation({ summary: 'Create a new airport' })
  @ApiResponse({ status: 201, type: [AirportModel] })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() createAirportDto: CreateAirportDto,
  ): Promise<AirportEntity> {
    return await this.airportsService.create(createAirportDto);
  }

  @ApiOperation({ summary: 'Remove an airport by id' })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'The record was deleted successfully',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'The airport with this id, does not exist',
  })
  @Delete(':uuid')
  @ApiParam({ type: 'String', name: 'uuid' })
  @HttpCode(204)
  async remove(
    @Param('uuid', ParseUUIDPipe, AirportIsExistPipe) airport: AirportEntity,
  ): Promise<void> {
    if (airport) {
      return await this.airportsService.remove(airport.id);
    }
    return notFoundError(entity.airport);
  }
}
