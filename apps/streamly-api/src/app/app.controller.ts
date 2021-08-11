import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get('/uptime')
  getUptime(): number {
    return process.uptime();
  }
}
