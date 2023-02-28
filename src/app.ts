import env from './config.env';
import express from 'express';
import HTTPS from 'https';
import helmet from 'helmet'
import cookieParser from "cookie-parser";
import error from './middlewares/errorhandlers';
// import { myHomeCountSchedule } from './util/setSchedule';
import sequelize from './db/config/connection';
import associate from './db/config/associate';
import indexRouter from './api/routes/index';

import passportConfig from './passport'
passportConfig();

export const app = express();
const httpsServer = HTTPS.createServer(app);


app.use(helmet());
app.use(cookieParser());
app.use(express.json());

app.use(indexRouter);
app.use(error.logger, error.handler);


if (env.NODE_ENV !== 'test') {
  sequelize
    .authenticate()
    .then(() => {
      associate();
      console.log('DB CONNECTED');
    })
    .catch((error) => {
      console.error(error);
      console.log('DB CONNECTION FAIL');

      process.exit(0);
    });
}

app.use((req, res, next) => {
  res.set({
    'Access-Control-Allow-Origin': req.headers.origin,
    'Access-Control-Allow-Headers': 'XMLHttpRequest,Content-Type',
    'Access-Control-Allow-Methods': 'POST,GET',
    'Access-Control-Allow-Credentials': true,
    'Access-Control-Allow-Private-Network': true,
  });
  next();
});

export default httpsServer;