import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('App')
@Controller()
export class AppController {
  @Get('/uptime')
  @ApiOkResponse()
  getUptime(): number {
    return process.uptime();
  }
}
