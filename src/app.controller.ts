import { ConfigService } from '@nestjs/config';
import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly configService: ConfigService,
  ) {}

  @Get()
  getHello(): string {
    console.log('this', this.configService.get<string>('http.port'));

    return this.appService.getHello();
  }
}
