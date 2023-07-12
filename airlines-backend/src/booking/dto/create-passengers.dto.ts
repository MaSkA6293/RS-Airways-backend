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
  @ApiProperty({
    type: () => Array<CreatePassengerDto>,
    description: 'Adults passengers',
  })
  @IsDefined()
  @IsArray()
  @ValidateNested()
  @Type(() => CreatePassengerDto)
  @ValidateIf((object) => object && typeof object.adult !== 'undefined')
  adult?: CreatePassengerDto[];

  @ApiProperty({
    type: () => Array<CreatePassengerDto>,
    description: 'Children passengers',
  })
  @IsDefined()
  @IsArray()
  @ValidateNested()
  @Type(() => CreatePassengerDto)
  @ValidateIf((object) => object && typeof object.children !== 'undefined')
  children?: CreatePassengerDto[];

  @ApiProperty({
    type: () => Array<CreatePassengerDto>,
    description: 'Infants passengers',
  })
  @IsDefined()
  @IsArray()
  @ValidateNested()
  @Type(() => CreatePassengerDto)
  @ValidateIf((object) => object && typeof object.infant !== 'undefined')
  infant?: CreatePassengerDto[];
}
