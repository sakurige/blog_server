import { Module } from '@nestjs/common';

import { roleProviders } from './role.provider';
@Module({
  providers: [...roleProviders],
})
export class RoleModule {}
