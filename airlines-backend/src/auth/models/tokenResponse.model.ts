import { ApiProperty } from '@nestjs/swagger';

export class TokenResponse {
  @ApiProperty({
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI0NGI0YjUxZC0zNDkxLTQ3MzItYTc3ZC1kM2FiOTMyMDM4NzQiLCJpYXQiOjE2ODY0OTAwMTIsImV4cCI6MTY4NjQ5MTgxMn0.XVPoIe0zjg_X-KPm9yNtZk0_aGSgo-7TljGNGUynLQ0',
    description: 'JWT token',
  })
  accessToken: string;

  @ApiProperty({
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI0NGI0YjUxZC0zNDkxLTQ3MzItYTc3ZC1kM2FiOTMyMDM4NzQiLCJpYXQiOjE2ODY0OTAwMTIsImV4cCI6MTY4OTA4MjAxMn0.JXk_aR_4H9QrGuLnKwZLbW3pTnWk_7CaISdb-Ial31s',
    description: 'JWT refresh token',
  })
  refreshToken: string;
}
