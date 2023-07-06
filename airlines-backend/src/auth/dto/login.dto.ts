import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsEmail } from 'class-validator';

export class LoginUserDto {
  @ApiProperty({
    example: 'test@example.com',
    description: 'E-mail',
  })
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'Qwerty123@',
    description: 'Password',
  })
  @IsNotEmpty()
  @IsString()
  password: string;
}
