import { DataSource } from 'typeorm';
import env from '../../config.env';
import * as models from '../models';

export const typeORMConfig = new DataSource({
  type: 'mysql',
  host: env.DB_NAME,
  port: 3306,
  username: env.DB_USER,
  password: env.DB_PASSWORD,
  database: env.DB_NAME,
  entities: models,
  synchronize: true,
  // synchronize: env.synchronize,
});
