import env from './config.env';
// const redis = require('redis');
import express from 'express';
import { createServer } from 'https';
import fs from 'fs'
// import error from './middlewares/errorhandlers';
// import sequelize from './db/config/connection';
// import associate from './db/config/associate';
// import {stream} from './util/logger'
import helmet from 'helmet'
import { errorHandler, errorLogger } from './routes/middlewares/error-hander.middleware';
import { myHomeCountSchedule } from './util/setSchedule';

// import cookieParser from 'cookieParser'
// import session from 'cookie-session'
// import passport from 'passport'
import passportConfig from './passport'
passportConfig();

const app = express();
const https = createServer(app);
const router = require('./routes');
const port = process.env.EXPRESS_PORT || 3000;
// let corsOptions = {
//   origin: process.env.FRONT_END_URL,
//   credentials: true,
// };

myHomeCountSchedule();

// app.use(
//   session({
//     resave: false,
//     saveUninitialized: false,
//     secret: [process.env.KAKAO_SECRET, process.env.GOOGLE_SECRET],
//     cookie: {
//       httpOnly: true,
//       secure: false,
//     },
//   })
// );
// app.use(passport.initialize());
// app.use(passport.session());
// app.use(cors(corsOptions));
// app.use(cookieParser());
app.use(helmet());
// app.use(morgan('combined', { stream }));
app.use(express.json());
app.use('/api', router);
// app.use(hpp());
app.use(express.urlencoded({ extended: false }));
app.use(errorLogger); // Error Logger
app.use(errorHandler); // Error Handler

try {
  const option = {
    ca: fs.readFileSync(env.CA_FULL_CHAIN),
    key: fs.readFileSync(env.KEY_PRIVKEY),
    cert: fs.readFileSync(env.CERT_CERT),
  };

  createServer(option, app).listen(port, () => {
    console.log('🟢 HTTPS 서버가 실행되었습니다. 포트 :: ' + port);
  });
} catch (error) {
  app.listen(port, () => {
    console.log('🟢 HTTP 서버가 실행되었습니다. 포트 :: ' + port);
  });
}

module.exports = https;
