import env from '../../util/config.env.mjs'
module.exports = {
  development: {
    username: env.DB_USER,
    password: env.DB_PASSWORD,
    database: env.DB_NAME,
    host: env.DB_END_POINT,
    port: env.DB_PORT,
    timezone: '+09:00',
    dialect: 'mysql',
    logging: false,
    dialectOptions: {
      charset: 'utf8mb4',
      dateStrings: true,
      typeCast: true,
    },
  },
  test: {
    username: env.DB_USER,
    password: env.DB_PASSWORD,
    database: 'database_test',
    host: env.DB_END_POINT,
    dialect: 'mysql',
  },
  production: {
    username: env.DB_USER,
    password: env.DB_PASSWORD,
    database: 'database_production',
    host: env.DB_END_POINT,
    dialect: 'mysql',
  },
};
