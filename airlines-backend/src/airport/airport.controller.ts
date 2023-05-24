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
import { createMockAirports } from './mock/createAirportsMock';
import {
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiOkResponse,
} from '@nestjs/swagger';
import { AirportIsExistPipe } from './airport.isExist.pipe';

@Controller('airport')
@ApiTags('Airport')
export class AirportsController {
  constructor(private airportsService: AirportService) {}

  @ApiOperation({ summary: 'Get all the airports' })
  @ApiResponse({ status: 200, type: [AirportEntity] })
  @Get()
  findAll(): Promise<AirportEntity[] | []> {
    return this.airportsService.findAll();
  }

  @ApiOperation({ summary: 'Create a new airport' })
  @ApiOkResponse({ status: 201, type: [AirportEntity] })
  @Post()
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
  @HttpCode(204)
  async remove(
    @Param('uuid', ParseUUIDPipe, AirportIsExistPipe) id: string,
  ): Promise<void> {
    return await this.airportsService.remove(id);
  }

  @ApiOperation({ summary: 'Generate mock airports' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The mock records were successfully created',
  })
  @HttpCode(201)
  @Get('mock')
  async createMockAirport(): Promise<string> {
    await createMockAirports(this.airportsService);
    return 'success';
  }
}
