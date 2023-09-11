import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

import { configModuleOptions } from './config/module-options';
import { databaseProviders } from './database/database.providers';
import { SharedService } from './shared.service';
@Module({
  providers: [SharedService, ...databaseProviders],
  exports: [SharedService, ...databaseProviders],
  imports: [
    ConfigModule.forRoot(configModuleOptions),
    JwtModule.register({
      global: true,
    }),
  ],
})
export class SharedModule {}
