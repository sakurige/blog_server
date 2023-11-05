import { Module } from '@nestjs/common';

import { UserModule } from './modules/user/user.module';
import { SharedModule } from './shared/shared.module';
import { AppController } from './test.controller';

@Module({
  controllers: [AppController],
  imports: [SharedModule, UserModule],
})
export class AppModule {}
