import { ConfigModuleOptions } from '@nestjs/config';
import configuration from './configuration';
export const configModuleOptions: ConfigModuleOptions = {
  isGlobal: true,
  envFilePath: '.yml',
  load: [configuration], //加载器就使用创建的
};
