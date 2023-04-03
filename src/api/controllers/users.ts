import { Request, Response, NextFunction } from 'express';
import { Users } from '../../services';
import Joi from '../../utils/joi';
import { UserInfo } from '../../interfaces/user';
import redis from '../../db/cache/redis';
import AppError from '../../utils/appError';
import { accessTokenCookieOptions } from '../../middlewares/auth';
import env from '../../config.env';

if (process.env.NODE_ENV === 'production')
  accessTokenCookieOptions.secure = true;

export default {
  signup: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, name, password, confirm, gender, birth } =
        await Joi.signupSchema.validateAsync(req.body);

      if (password !== confirm)
        throw new AppError('비밀번호가 일치하지 않습니다.', 400);

      const emailcheck = await Users.emailDuplicates(email);
      if (emailcheck) throw new AppError('이메일 중복검사를 해주세요.', 409);

      if (name.includes(password) || password.includes(name))
        throw new AppError('이름과 비밀번호를 다른형식으로 설정해주세요.', 400);

      const users: UserInfo = {
        email,
        name,
        password,
        gender,
        birth,
      };

      await Users.createUser(users);
      res.status(201).json({ msg: '회원가입에 성공하셨습니다.' });
    } catch (error) {
      next(error);
    }
  },

  //로그인
  login: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = await Joi.loginSchema.validateAsync(req.body);

      const { accesstoken, myhomeId } = await Users.userLogin(email, password);

      res.cookie('accesstoken', accesstoken, accessTokenCookieOptions);
      res.cookie('logged_in', true, {
        ...accessTokenCookieOptions,
        httpOnly: false,
      });

      res.status(200).json({
        authorization: 'Bearer ' + accesstoken,
        myhomeId,
      });
    } catch (error) {
      next(error);
    }
  },

  refreshAccessTokenHandler: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      res.status(405).json({ msg: '구현되지 않은 기능입니다.' });
      // const message = '액세스 토큰을 새로 발급 받을 수 없습니다.';

      // const { userId } = decodeJwt<{ userId: number }>(req.cookies.accesstoken);

      // const session = await redis.get(userId);
      // if (!session) return next(new AppError(message, 403));
      // const refreshtoken = JSON.parse(session).refreshtoken as string;

      // const decoded = verifyJwt<{ userId: number }>(refreshtoken);
      // if (!decoded) return next(new AppError(message, 403));

      // const user = await Users.findUserMyhome(decoded.userId);

      // if (!user) return next(new AppError(message, 403));

      // const accesstoken = signJwt({ userId: user.userId });

      // redis.set(
      //   user.userId,
      //   JSON.stringify({ userId: user.userId, refreshtoken })
      // );

      // res.cookie('accesstoken', accesstoken, accessTokenCookieOptions);
      // res.cookie('logged_in', true, {
      //   ...accessTokenCookieOptions,
      //   httpOnly: false,
      // });

      // res.status(200).json({
      //   status: 'success',
      //   accesstoken: 'Bearer ' + accesstoken,
      // });
    } catch (error) {
      next(error);
    }
  },

  logout: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { user } = res.app.locals;
      await redis.del(user.userId);
      res.cookie('accesstoken', '', { maxAge: 1 });
      res.cookie('logged_in', '', {
        maxAge: 1,
      });
      res.status(200).json({ msg: '로그아웃 되었습니다.' });
    } catch (error) {
      next(error);
    }
  },

  //이메일 중복
  emailCheck: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email } = await Joi.emailCheckSchema.validateAsync(req.body);

      const emailCheck = await Users.emailDuplicates(email);
      if (emailCheck) throw new AppError('이미 등록된 사용자입니다.', 409);

      res.status(200).send({ msg: '사용가능한 이메일입니다.' });
    } catch (error) {
      next(error);
    }
  },

  surfing: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await Users.surfing();
      res.status(200).send({ data: result!.myhomeId });
    } catch (error) {
      next(error);
    }
  },

  myhome: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { myhomeId } = req.params;
      await Users.todayTotal(req);
      const result = await Users.findByMyhome(+myhomeId);
      res.status(200).send({ data: result });
    } catch (error) {
      next(error);
    }
  },

  intro: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { myhomeId } = req.params;
      const { intro } = req.body;
      const { userId } = res.app.locals.user;
      const findMyHome = await Users.findByMyhome(+myhomeId);

      if (!findMyHome) throw new AppError('잘못된 요청입니다.', 403);
      if (userId != findMyHome.userId)
        throw new AppError('본인 소개글만 수정가능합니다.', 403);

      const file = req.file as Express.MulterS3.File;

      const imageFileName = file ? file.key : null;
      const profile = imageFileName
        ? env.S3_STORAGE_URL + imageFileName
        : null;

      await Users.introupdate(+myhomeId, intro, profile);
      res.status(201).json({ msg: 'intro가 수정되었습니다' });
    } catch (error) {
      next(error);
    }
  },

  //도토리
  // chargeDotori: async (req: Request, res: Response, next: NextFunction) => {
  //   try {
  //     const price = await Users.chargeDotori(req, res);
  //     res.status(200).send({ msg: `도토리 ${price}개가 충전되었습니다.` });
  // } catch (error) {
  //   res.status(400).json({ msg: error.message });
  // next(error);
  // }
  // };

  // chargeCoupons: (req: Request, res: Response, next: NextFunction) => {
  //   try {
  //     res.status(200).send({ msg: `쿠폰으로 ${coupon}개가 충전되었습니다.` });
  // } catch (error) {
  //   res.status(400).json({ msg: error.message });
  // next(error);
  // }
  // };

  getAllUsers: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const users = await Users.findAllUsers();
      res.status(200).json({
        status: 'success',
        result: users.length,
        data: {
          users,
        },
      });
    } catch (error) {
      next(error);
    }
  },
};
