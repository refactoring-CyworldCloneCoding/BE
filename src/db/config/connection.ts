import { Sequelize } from 'sequelize';
import env from '../../config.env';

const sequelize = new Sequelize({
  host: env.DB_HOST,
  database: env.DB_NAME,
  username: env.DB_USER,
  password: env.DB_PASSWORD,
  dialect: 'mysql',
  timezone: '+09:00',
  logging: false,
  dialectOptions: {
    charset: 'utf8mb4',
    dateStrings: true,
    typeCast: true,
  },
});

export default sequelize;
