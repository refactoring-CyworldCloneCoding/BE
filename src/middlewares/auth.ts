import { Request, Response, NextFunction } from 'express';
import { signJwt, verifyJwt } from '../utils/jwt';
import { JwtPayload } from 'jsonwebtoken';

export default {
  authMiddleware: (req: Request, res: Response, next: NextFunction) => {
    const invalidError = new Error('로그인이 필요한 기능입니다.');

    try {
      const { accesstoken, refreshtoken } = req.headers;
      if (!accesstoken || !refreshtoken) throw invalidError;
      if (
        accesstoken === undefined ||
        typeof accesstoken !== 'string' ||
        typeof refreshtoken !== 'string'
      )
        throw invalidError;

      const [tokenType, accessToken] = accesstoken.split(' ');
      if (tokenType !== 'Bearer') throw invalidError;

      const payload: JwtPayload | string | null = verifyJwt(accessToken);
      if (payload === null) {
        console.log('INVALID ACCESSTOKEN');

        const refreshCheck = verifyJwt(refreshtoken);
        if (refreshCheck === null) throw invalidError;

        const payload: JwtPayload = req.session.cookie!;
        if (payload === undefined) throw invalidError;

        req.app.locals.user = payload;
        const newAccessToken = signJwt(payload);

        res.set('accesstoken', 'Bearer ' + newAccessToken);
        return next();
      } else {
        req.app.locals.user = payload;
        res.set('accesstoken', 'Bearer ' + accessToken);
        return next();
      }
    } catch (error: any) {
      res.statusCode = 400;
      res.json({
        message: error.message,
      });
    }
  },

  tokenChecker: (req: Request, res: Response, next: NextFunction) => {
    try {
      const { accesstoken, refreshtoken } = req.headers;

      if (accesstoken && refreshtoken) {
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
};
