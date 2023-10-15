import { Provider } from '@nestjs/common';
import { DataSource } from 'typeorm';

import { Permission } from './entities/permission.entity.mysql';
export const permProviders: Provider[] = [
  {
    inject: ['MYSQL_CONNECTION'],
    provide: 'PERM_REPOSITORY',
    useFactory: async (dataSource: DataSource) =>
      await dataSource.getRepository(Permission),
  },
];
