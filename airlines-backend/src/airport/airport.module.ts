import { Module } from '@nestjs/common';
import { AirportsController } from './airport.controller';
import { AirportService } from './airport.service';
import { AirportEntity } from './entities/airport.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([AirportEntity])],
  controllers: [AirportsController],
  providers: [AirportService],
})
export class AirportModule {}
