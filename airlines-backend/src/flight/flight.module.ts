import { Module } from '@nestjs/common';
import { FlightController } from './flight.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FlightEntity } from './entities/flight.entity';
import { FlightService } from './flight.service';
import { AirportEntity } from 'src/airport/entities/airport.entity';
import { AirportService } from 'src/airport/airport.service';

@Module({
  imports: [TypeOrmModule.forFeature([FlightEntity, AirportEntity])],
  controllers: [FlightController],
  providers: [FlightService, AirportService],
})
export class FlightModule {}
