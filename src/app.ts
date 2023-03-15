import express, { NextFunction, Request, Response } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import router from './api/routes/index';
import env from './config.env';
import todayInit from './utils/todayInit';
import helmet from 'helmet';

const app = express();

// Middlewares

// 1. Body Parser
app.use(express.json({ limit: '10kb' }));

// 2. Cookie Parser
app.use(cookieParser());

// 3. Helmet
app.use(helmet());

// 4. Headers Setting
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

// 5. Cors
app.use(
  cors({
    origin: [env.FRONT_END_URL],
    credentials: true,
  })
);

// 8. Logger
if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));

// 9. Today Timer Start
todayInit.initStart();

// 10. Routes
app.use('/', router);

// Testing
app.get(
  '/api/healthChecker',
  (req: Request, res: Response, next: NextFunction) => {
    res.status(200).json({
      status: 'success',
      message: 'Welcome to CodevoWeb😂😂👈👈',
    });
  }
);

// UnKnown Routes
app.all('*', (req: Request, res: Response, next: NextFunction) => {
  const err = new Error(`Route ${req.originalUrl} not found`) as any;
  err.statusCode = 404;
  next(err);
});

// Global Error Handler
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  err.status = err.status || 'error';
  err.statusCode = err.statusCode || 500;

  res.status(err.statusCode).json({
    status: err.status,
    msg: err.message,
  });
});

export default app;
