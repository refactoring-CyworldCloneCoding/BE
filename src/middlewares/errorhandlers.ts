import { Request, Response, NextFunction } from 'express';
import { HttpException } from '../common';

class ErrorHandler {
  logger(
    error: HttpException | TypeError | Error,
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    console.error(error);
    next(error);
  }

  handler(
    error: HttpException | TypeError | Error,
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    if (error instanceof HttpException) {
      const status = error.status || 400;
      res.status(status).json({
        msg: error.message,
      });
    } else {
      res.status(400).json({
        msg: error.message,
      });
    }
  }
}

export default new ErrorHandler();
