import { Provider } from '@nestjs/common';
import { DataSource } from 'typeorm';

import UserEntity from './entities/user.entity.mysql';
const userProviders: Provider[] = [
  {
    inject: ['MYSQL_CONNECTION'],
    provide: 'USER_REPOSITORY',
    useFactory: async (dataSource: DataSource) =>
      await dataSource.getRepository(UserEntity),
  },
];
export default userProviders;
