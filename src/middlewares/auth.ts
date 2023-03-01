import { Request, Response, NextFunction } from 'express';
import jwt from '../utils/jwt';
import { JwtPayload } from 'jsonwebtoken';

export default {
  authMiddleware: (req: Request, res: Response, next: NextFunction) => {
    const invalidError = new Error('로그인이 필요한 기능입니다.');

    try {
      const { Authorization, refreshToken } = req.headers;
      if (
        Authorization === undefined ||
        Authorization !== 'string' ||
        typeof refreshToken !== 'string'
      )
        throw invalidError;

      const [tokenType, accessToken] = Authorization.split(' ');
      if (tokenType !== 'Bearer') throw invalidError;

      const payload: JwtPayload | string | null = jwt.verify(accessToken);
      if (payload === null) {
        console.log('INVALID ACCESSTOKEN');

        const refreshCheck = jwt.refreshVerify(refreshToken);
        if (refreshCheck === null) throw invalidError;

        const payload: JwtPayload = req.session.cookie!;
        if (payload === undefined) throw invalidError;

        req.app.locals.user = payload;
        const newAccessToken = jwt.sign(payload);

        res.set('Authorization', 'Bearer ' + newAccessToken);
        return next();
      } else {
        req.app.locals.user = payload;
        res.set('Authorization', 'Bearer ' + accessToken);
        return next();
      }
    } catch (error: any) {
      res.statusCode = 401;
      res.json({
        message: error.message,
      });
    }
  },

  tokenChecker: (req: Request, res: Response, next: NextFunction) => {
    try {
      const { Authorization, refreshToken } = req.headers;

      if (Authorization && refreshToken) {
        const error = new Error('이미 로그인이 되어있습니다.');
        return res.status(400).json({
          message: error.message,
        });
      }

      return next();
    } catch (error: any) {
      res.statusCode = 400;
      res.json({
        message: error.message,
      });
    }
  },

  // tempAuth: (req: Request, res: Response, next: NextFunction) => {
  //     const key = req.query.id;
  //     switch (Number(key)) {
  //         case 1:
  //             req.app.locals.user = { userId: 1, nickname: "BOSS" };
  //             break;
  //         case 2:
  //             req.app.locals.user = { userId: 2, nickname: "root" };
  //             break;
  //         case 3:
  //             req.app.locals.user = { userId: 3, nickname: "mysql" };
  //             break;
  //         case 4:
  //             req.app.locals.user = { userId: 4, nickname: "test" };
  //             break;
  //         case 5:
  //             req.app.locals.user = { userId: 5, nickname: "sparta" };
  //             break;
  //     }

  //     return next();
  // }
};
