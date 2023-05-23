import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Test API')
@Controller()
export class AppController {
  @ApiOperation({ summary: 'Test API' })
  @ApiResponse({ status: 200, type: String })
  @Get()
  check(): string {
    return 'The server is working properly';
  }
}
