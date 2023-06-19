import { ApiProperty } from '@nestjs/swagger';
import {
  IsDefined,
  IsNotEmptyObject,
  IsObject,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CreatePassengerDto } from './create-passenger.dto';

export class CreatePassengersDto {
  @ApiProperty({
    type: () => Array<CreatePassengerDto>,
    description: 'Adults passengers',
  })
  @IsDefined()
  @IsNotEmptyObject()
  @IsObject()
  @ValidateNested()
  @Type(() => CreatePassengerDto)
  adults: CreatePassengerDto[];

  @ApiProperty({
    type: () => Array<CreatePassengerDto>,
    description: 'Children passengers',
  })
  @IsDefined()
  @IsNotEmptyObject()
  @IsObject()
  @ValidateNested()
  @Type(() => CreatePassengerDto)
  children: CreatePassengerDto[];

  @ApiProperty({
    type: () => Array<CreatePassengerDto>,
    description: 'Infants passengers',
  })
  @IsDefined()
  @IsNotEmptyObject()
  @IsObject()
  @ValidateNested()
  @Type(() => CreatePassengerDto)
  infants: CreatePassengerDto[];
}
