import { Controller, Get } from '@nestjs/common';

@Controller('/')
export class AppController {
  constructor() {}

  @Get('/')
  getHealth(): boolean {
    return true;
  }
}
