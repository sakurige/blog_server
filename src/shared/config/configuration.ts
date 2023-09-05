import { readFileSync } from 'fs';
import * as yaml from 'js-yaml';
import { join } from 'path';

const yamlFile =
  process.env.NODE_ENV === 'production' ? 'production.yml' : 'development.yml';
export default () => {
  return yaml.load(
    readFileSync(join(process.cwd(), yamlFile), 'utf8'),
  ) as Record<string, any>;
};
