import { Controller, Get, UseGuards } from '@nestjs/common';

import { AuthGuard } from './modules/user/guards/auth.guard';
@Controller()
export class AppController {
  @Get()
  @UseGuards(AuthGuard)
  test() {
    return 'Hello World';
  }
}
