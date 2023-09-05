import { configModuleOptions } from './config/module-options';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SharedService } from './shared.service';
import { databaseProviders } from './database/database.providers';
@Module({
  providers: [SharedService, ...databaseProviders],
  exports: [ConfigModule, SharedService, ...databaseProviders],
  imports: [ConfigModule.forRoot(configModuleOptions)],
})
export class SharedModule {}
