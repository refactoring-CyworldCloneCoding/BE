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
};

const invalidError = new AppError('로그인이 필요한 기능입니다.', 401);

async function accessTokenReissue(
  req: Request,
  res: Response,
  next: NextFunction
) {
  let accesstoken;

  try {
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    )
      accesstoken = req.headers.authorization.split(' ')[1];
    else if (req.cookies.accesstoken) accesstoken = req.cookies.accesstoken;

    if (!accesstoken) return next(invalidError);

    const { userId } = decodeJwt<{ userId: number }>(accesstoken);

    const session = await redis.get(userId);
    if (!session) return next(invalidError);

    const refreshtoken = JSON.parse(session).refreshtoken as string;

    const decoded = verifyJwt<{ userId: number }>(refreshtoken);
    if (!decoded) return next(invalidError);

    const user = await Users.findOne({
      where: { userId: decoded.userId },
      relations: { myhome: true },
    });

    if (!user) return next(invalidError);

    const newAccesstoken = signJwt({
      myhomeId: user.myhome.myhomeId,
      userId: user.userId,
      name: user.name,
      gender: user.gender,
    });

    redis.set(
      user.userId,
      JSON.stringify({ userId: user.userId, refreshtoken })
    );

    res.cookie('accesstoken', newAccesstoken, accessTokenCookieOptions);
    res.cookie('logged_in', true, {
      ...accessTokenCookieOptions,
      httpOnly: false,
    });

    res.status(401).json({
      authorization: 'Bearer ' + newAccesstoken,
      myhomeId: user.userId,
      msg: '토큰 재발급',
    });
  } catch (error) {
    next(error);
  }
}

export default {
  isNotLoggedIn: async (req: Request, res: Response, next: NextFunction) => {
    let accesstoken;

    try {
      if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
      )
        accesstoken = req.headers.authorization.split(' ')[1];
      else if (req.cookies.accesstoken) accesstoken = req.cookies.accesstoken;

      const decoded = verifyJwt<{ userId: number }>(accesstoken);
      if (!accesstoken || !decoded)
        return await accessTokenReissue(req, res, next);

      const session = await redis.get(decoded.userId);
      if (!session) return next(invalidError);

      const user = await Users.findOne({ where: { userId: decoded.userId } });
      if (!user) return next(invalidError);

      res.app.locals.user = user;

      next();
    } catch (error) {
      next(error);
    }
  },

  isLoggedIn: (req: Request, res: Response, next: NextFunction) => {
    let accesstoken;

    try {
      if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
      )
        accesstoken = req.headers.authorization.split(' ')[1];
      else if (req.cookies.accesstoken) accesstoken = req.cookies.accesstoken;

      const decoded = verifyJwt<{ userId: number }>(accesstoken);
      if (decoded) next(new AppError('이미 로그인 되어있습니다.', 401));

      next();
    } catch (error) {
      next(error);
    }
  },
};
