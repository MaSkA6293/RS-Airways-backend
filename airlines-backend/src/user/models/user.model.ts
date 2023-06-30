import { ApiProperty } from '@nestjs/swagger';

export class UserModel {
  @ApiProperty({
    example: '26bb1722-38dd-42eb-b6fa-6cae47c5b585',
    description: 'Unique id',
  })
  id: string;

  @ApiProperty({
    example: 'test@example.com',
    description: 'E-mail',
  })
  email: string;

  @ApiProperty({
    example: 'Qwerty123@',
    description: 'Password',
  })
  password: string;

  @ApiProperty({
    example: 'John',
    description: 'First name',
  })
  firstName: string;

  @ApiProperty({
    example: 'Doe',
    description: 'Last name',
  })
  lastName: string;

  @ApiProperty({
    example: '2024-02-20T20:15:00.000Z',
    description: 'Date of birthday',
  })
  dateOfBirth: Date;

  @ApiProperty({
    example: 'Male',
    description: 'Gender - Male or Female',
  })
  gender: string;

  @ApiProperty({
    example: '+93',
    description: 'Country code',
  })
  countryCode: string;

  @ApiProperty({
    example: '1111111111',
    description: 'The phone number (without country code)',
  })
  phoneNumber: number;

  @ApiProperty({
    example: 'USA',
    description: 'Citizenship',
  })
  citizenship: string;
}
