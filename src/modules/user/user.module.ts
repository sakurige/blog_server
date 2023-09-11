import { SharedModule } from './../../shared/shared.module';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { Module } from '@nestjs/common';
import userProviders from './user.provider';
@Module({
  imports: [SharedModule],
  providers: [UserService, ...userProviders],
  controllers: [UserController],
})
export class UserModule {}
