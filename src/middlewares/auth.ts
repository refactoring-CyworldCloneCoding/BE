import { Request, Response, NextFunction } from 'express';
import redis from '../db/cache/redis';
import { Users } from '../db/models';
import AppError from '../utils/appError';
import { verifyJwt } from '../utils/jwt';

export default {
  isNotLoggedIn: async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Get the token
      let access_token;
      if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
      ) {
        access_token = req.headers.authorization.split(' ')[1];
      } else if (req.cookies.access_token) {
        access_token = req.cookies.access_token;
      }

      if (!access_token) {
        return next(new AppError('You are not logged in', 401));
      }

      // Validate Access Token
      const decoded = verifyJwt<{ sub: string }>(access_token);

      if (!decoded) {
        return next(new AppError(`Invalid token or user doesn't exist`, 401));
      }

      // Check if user has a valid session
      const session = await redis.get(decoded.sub);

      if (!session) {
        return next(new AppError(`User session has expired`, 401));
      }

      // Check if user still exist
      const user = await Users.findOne({
        where: { userId: JSON.parse(session).userId },
      });

      if (!user) {
        return next(new AppError(`User with that token no longer exist`, 401));
      }

      // This is really important (Helps us know if the user is logged in from other controllers)
      // You can do: (req.user or res.locals.user)
      res.app.locals.user = user;

      next();
    } catch (err: any) {
      next(err);
    }
  },

  isLoggedIn: (req: Request, res: Response, next: NextFunction) => {
    try {
      let access_token;
      if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
      ) {
        access_token = req.headers.authorization.split(' ')[1];
      } else if (req.cookies.access_token) {
        access_token = req.cookies.access_token;
      }

      if (access_token) {
        const error = new AppError('You are logged in', 401);
        return res.json({ msg: error.message });
      }

      return next();
    } catch (error: any) {
      res.status(400).json({
        message: error.message,
      });
    }
  },
};

// export const isLoggedIn = (req: Request, res: Response, next: NextFunction) => {
//   // isAuthenticated()로 검사해 로그인이 되어있으면
//   if (req.isAuthenticated()) {
//     next(); // 다음 미들웨어
//   } else {
//     res.status(403).send('로그인이 필요합니다.');
//   }
// };

// export const isNotLoggedIn = (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   if (!req.isAuthenticated()) {
//     next(); // 로그인 안되어있으면 다음 미들웨어
//   } else {
//     // const message = encodeURIComponent('로그인한 상태입니다.');
//     res.status(400).json({ msg: '이미 로그인이 되어있습니다.' });
//   }
// }
