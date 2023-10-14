import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { configModuleOptions } from './config/module-options';
import { databaseProviders } from './database/database.providers';
import { SharedService } from './shared.service';
@Module({
  providers: [SharedService, ...databaseProviders],
  exports: [ConfigModule, SharedService, ...databaseProviders],
  imports: [ConfigModule.forRoot(configModuleOptions)],
})
export class SharedModule {}
