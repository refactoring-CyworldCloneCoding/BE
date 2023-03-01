import express, { Express } from 'express';
import helmet from 'helmet';
import error from './middlewares/errorhandlers';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import env from './config.env';
import router from './api/routes/index';

// import passportConfig from './passport';
// passportConfig();

class App {
  public app: Express;

  constructor() {
    this.app = express();
    this.middleware();
    this.testUrl();
    this.router();
  }

  public middleware() {
    this.app.use(express.json());
    this.app.use(cookieParser());
    this.app.use(helmet());
    this.app.use(error.logger, error.handler);
    this.app.use(
      session({
        resave: true,
        saveUninitialized: false,
        secret: env.SESSION_KEY,
        cookie: {
          httpOnly: true,
          secure: false,
        },
      })
    );
    this.app.use((req, res, next) => {
      res.set({
        'Access-Control-Allow-Origin': req.headers.origin,
        'Access-Control-Allow-Headers': 'XMLHttpRequest,Content-Type',
        'Access-Control-Allow-Methods': 'POST,GET,PUT,DELETE',
        'Access-Control-Allow-Credentials': true,
        'Access-Control-Allow-Private-Network': true,
      });
      next();
    });
    this.app.use(
      cors({
        origin: 'http://localhost:3000',
        credentials: true,
      })
    );
  }

  public router() {
    this.app.use('/', router);

    // this.app.use((req, res, next) => {
    //   const error = new Error('PAGE NOT FOUND');
    //   // res.status(404).send(error.message);
    //   res.status(404).json({ message: error.message });
    // });
  }

  public testUrl() {
    this.app.get('/', (req, res) => {
      console.log('success');
      res.status(200).send('success');
    });
  }
}

export default new App();
