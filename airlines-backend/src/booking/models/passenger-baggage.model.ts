import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, Max, Min } from 'class-validator';

export class PassengerBaggage {
  @ApiProperty({
    example: '1',
    description: 'Addition item 8 kg (max:2)',
  })
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @Max(2)
  light: number;

  @ApiProperty({
    example: '1',
    description: 'Addition item 12 kg (max:1)',
  })
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @Max(1)
  medium: number;

  @ApiProperty({
    example: '1',
    description: 'Addition item 25 kg (max:1)',
  })
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @Max(1)
  heavy: number;
}
