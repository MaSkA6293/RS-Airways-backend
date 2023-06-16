import { Type } from 'class-transformer';
import { Passengers } from './passengers.model';
import {
  IsDefined,
  IsNotEmptyObject,
  IsObject,
  ValidateNested,
} from 'class-validator';
import { FlightEntity } from 'src/flight/entities/flight.entity';

export class Trip {
  @IsDefined()
  @IsNotEmptyObject()
  @IsObject()
  @ValidateNested()
  @Type(() => Passengers)
  passengers: Passengers;

  @IsDefined()
  @IsNotEmptyObject()
  @IsObject()
  @ValidateNested()
  @Type(() => FlightEntity)
  flights: FlightEntity[];
}
