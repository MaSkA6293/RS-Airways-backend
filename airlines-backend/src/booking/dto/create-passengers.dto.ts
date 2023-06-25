import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsDefined,
  ValidateIf,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CreatePassengerDto } from './create-passenger.dto';

export class CreatePassengersDto {
  [key: string]: any;

  @ApiProperty({
    type: () => Array<CreatePassengerDto>,
    description: 'Adults passengers',
  })
  @IsDefined()
  @IsArray()
  @ValidateNested()
  @Type(() => CreatePassengerDto)
  @ValidateIf((object, value) => value !== null)
  adult?: CreatePassengerDto[];

  @ApiProperty({
    type: () => Array<CreatePassengerDto>,
    description: 'Children passengers',
  })
  @IsDefined()
  @IsArray()
  @ValidateNested()
  @Type(() => Array<CreatePassengerDto>)
  @ValidateIf((object, value) => value !== null)
  children?: CreatePassengerDto[];

  @ApiProperty({
    type: () => Array<CreatePassengerDto>,
    description: 'Infants passengers',
  })
  @IsDefined()
  @IsArray()
  @ValidateNested()
  @Type(() => Array<CreatePassengerDto>)
  @ValidateIf((object, value) => value !== null)
  infant?: CreatePassengerDto[];
}
