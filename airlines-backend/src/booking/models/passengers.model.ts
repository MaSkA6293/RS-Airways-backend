import { ApiProperty } from '@nestjs/swagger';
import { Passenger } from './passenger.model';
import {
  IsDefined,
  IsNotEmptyObject,
  IsObject,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class Passengers {
  @ApiProperty({
    type: () => Array<Passenger>,
    description: 'Adults passengers',
  })
  @IsDefined()
  @IsNotEmptyObject()
  @IsObject()
  @ValidateNested()
  @Type(() => Passenger)
  adults: Passenger[];

  @ApiProperty({
    type: () => Array<Passenger>,
    description: 'Children passengers',
  })
  @IsDefined()
  @IsNotEmptyObject()
  @IsObject()
  @ValidateNested()
  @Type(() => Passenger)
  children: Passenger[];

  @ApiProperty({
    type: () => Array<Passenger>,
    description: 'Infants passengers',
  })
  @IsDefined()
  @IsNotEmptyObject()
  @IsObject()
  @ValidateNested()
  @Type(() => Passenger)
  infants: Passenger[];
}
