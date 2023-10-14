import { Module } from '@nestjs/common';

import { SharedModule } from './../../shared/shared.module';
import { UserController } from './user.controller';
import userProviders from './user.provider';
import { UserService } from './user.service';
@Module({
  imports: [SharedModule],
  providers: [UserService, ...userProviders],
  controllers: [UserController],
})
export class UserModule {}
