import { join } from 'path';
import { ConfigService } from '@nestjs/config';
import { DataSource, DataSourceOptions } from 'typeorm';
import { Provider } from '@nestjs/common';
const MYSQL: DataSourceOptions['type'] = 'mysql';
const MONGO: DataSourceOptions['type'] = 'mongodb';
export const databaseProviders: Provider[] = [
  {
    provide: 'MYSQL_CONNECTION',
    inject: [ConfigService],
    useFactory: async (configService: ConfigService) => {
      const dataSource = new DataSource({
        type: MYSQL,
        host: configService.get<string>('db.mysql.url'),
        port: configService.get<number>('db.mysql.port'),
        username: configService.get<string>('db.mysql.username'),
        password: configService.get<string>('db.mysql.password'),
        database: configService.get<string>('db.mysql.database'),
        entities: [join(__dirname, '../../**/*.entity.mysql{.ts,.js}')],
        synchronize: true,
      });

      return await dataSource.initialize();
    },
  },
  {
    provide: 'MONGO_CONNECTION',
    inject: [ConfigService],
    useFactory: async (configService: ConfigService) => {
      const dataSource = new DataSource({
        type: MONGO,
        host: configService.get<string>('db.mongo.url'),
        port: configService.get<number>('db.mongo.port'),
        username: configService.get<string>('db.mongo.username'),
        password: configService.get<string>('db.mongo.password'),
        database: configService.get<string>('db.mongo.database'),
        entities: [__dirname + '/../**/*.entity.mongo{.ts,.js}'],
        synchronize: true,
      });
      await dataSource.initialize();
      return dataSource;
    },
  },
];
