import { Module } from '@nestjs/common';

import { permProviders } from './permission.provider';
@Module({
  providers: [...permProviders],
})
export class PermissionModule {}
