import { Request, Response, NextFunction, CookieOptions } from 'express';
import redis from '../db/cache/redis';
import { Users } from '../db/entities';
import AppError from '../utils/appError';
import { decodeJwt, signJwt, verifyJwt } from '../utils/jwt';

// Cookie options
export const accessTokenCookieOptions: CookieOptions = {
  expires: new Date(Date.now() + 12 * 60 * 60 * 1000),
  maxAge: 12 * 60 * 60,
  httpOnly: true,
  sameSite: 'lax',
};

async function accessTokenReissue(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const message = '액세스 토큰을 새로 발급 받을 수 없습니다.';

  const { userId } = decodeJwt<{ userId: number }>(req.cookies.accesstoken);

  const session = await redis.get(userId);
  if (!session) return next(new AppError(message, 403));
  const refreshtoken = JSON.parse(session).refreshtoken as string;

  const decoded = verifyJwt<{ userId: number }>(refreshtoken);
  if (!decoded) return next(new AppError(message, 403));

  const user = await Users.findOne({ where: { userId: decoded.userId } });

  if (!user) return next(new AppError(message, 403));

  const accesstoken = signJwt({ userId: user.userId });

  redis.set(
    user.userId,
    JSON.stringify({ userId: user.userId, refreshtoken })
  );

  res.cookie('accesstoken', accesstoken, accessTokenCookieOptions);
  res.cookie('logged_in', true, {
    ...accessTokenCookieOptions,
    httpOnly: false,
  });

  return accesstoken;
}

export default {
  isNotLoggedIn: async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Get the token
      let accesstoken;
      if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
      ) {
        accesstoken = req.headers.authorization.split(' ')[1];
      } else if (req.cookies.accesstoken) {
        accesstoken = req.cookies.accesstoken;
      }

      if (!accesstoken) {
        accesstoken = await accessTokenReissue(req, res, next);
        // return next(new AppError('로그인하지 않았습니다.', 401));
      }

      // Validate Access Token
      const decoded = verifyJwt<{ userId: number }>(accesstoken);

      if (!decoded) {
        return next(new AppError(`잘못된 토큰 또는 사용자가 없습니다`, 401));
      }

      // Check if user has a valid session
      const session = await redis.get(decoded.userId);

      if (!session) {
        return next(new AppError(`사용자 세션이 만료되었습니다.`, 401));
      }

      // Check if user still exist
      const user = await Users.findOne({
        where: { userId: decoded.userId },
      });

      if (!user) {
        return next(
          new AppError(
            `해당 토큰을 가진 사용자가 더 이상 존재하지 않습니다`,
            401
          )
        );
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
      let accesstoken;
      if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
      ) {
        accesstoken = req.headers.authorization.split(' ')[1];
      } else if (req.cookies.accesstoken) {
        accesstoken = req.cookies.accesstoken;
      }

      if (accesstoken) {
        const error = new AppError('이미 로그인 되어있습니다.', 401);
        return res.json({ msg: error.message });
      }

      return next();
    } catch (error: any) {
      res.status(400).json({
        msg: error.message,
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
