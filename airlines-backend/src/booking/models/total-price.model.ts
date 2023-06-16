import { ApiProperty } from '@nestjs/swagger';
import { Fare } from './fare.model';

export class TotalPrice {
  @ApiProperty({
    example: 1,
    description: 'Count of adult passengers',
  })
  adults: Fare;

  @ApiProperty({
    example: 1,
    description: 'Count of child passengers',
  })
  children: Fare;

  @ApiProperty({
    example: 1,
    description: 'Count of infant passengers',
  })
  infants: Fare;

  total: number;
}
