import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, Max, Min, ValidateIf } from 'class-validator';

export class PassengerBaggage {
  @ApiProperty({
    example: '1',
    description: 'Addition item 8 kg (max:2)',
  })
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @Max(2)
  @ValidateIf((object) => object && typeof object.light !== 'undefined')
  light?: number;

  @ApiProperty({
    example: '1',
    description: 'Addition item 12 kg (max:1)',
  })
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @Max(1)
  @ValidateIf((object) => object && typeof object.medium !== 'undefined')
  medium?: number;

  @ApiProperty({
    example: '1',
    description: 'Addition item 25 kg (max:1)',
  })
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @Max(1)
  @ValidateIf((object) => object && typeof object.heavy !== 'undefined')
  heavy?: number;
}
