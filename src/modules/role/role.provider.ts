import { Provider } from '@nestjs/common';
import { DataSource } from 'typeorm';

import { Role } from './entities/role.entity.mysql';
export const roleProviders: Provider[] = [
  {
    inject: ['MYSQL_CONNECTION'],
    provide: 'ROLE_REPOSITORY',
    useFactory: async (dataSource: DataSource) =>
      await dataSource.getRepository(Role),
  },
];
