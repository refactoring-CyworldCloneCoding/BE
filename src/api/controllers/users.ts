import { Request, Response, NextFunction, CookieOptions } from 'express';
import { Users } from '../../services';
import Joi from '../../utils/joi';
import { UserInfo } from '../../interfaces/user';
// import passport from 'passport';
import redis from '../../db/cache/redis';
import { signJwt, verifyJwt } from '../../utils/jwt';
import AppError from '../../utils/appError';

// Cookie options
const accessTokenCookieOptions: CookieOptions = {
  expires: new Date(60 * 60 * 12),
  maxAge: 60 * 60 * 12,
  httpOnly: true,
  sameSite: 'lax',
};

const refreshTokenCookieOptions: CookieOptions = {
  expires: new Date(60 * 60 * 24),
  maxAge: 60 * 60 * 24,
  httpOnly: true,
  sameSite: 'lax',
};

// Only set secure to true in production
if (process.env.NODE_ENV === 'production')
  accessTokenCookieOptions.secure = true;

export default {
  signup: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, name, password, confirm, gender, birth } =
        await Joi.signupSchema.validateAsync(req.body);

      if (password !== confirm)
        throw new Error('비밀번호가 일치하지 않습니다.');

      const emailcheck = await Users.emailDuplicates(email);
      if (emailcheck) throw new Error('이메일 중복검사를 해주세요.');

      if (name.includes(password) || password.includes(name))
        throw new Error('이름과 비밀번호를 다른형식으로 설정해주세요.');

      const users: UserInfo = {
        email,
        name,
        password,
        gender,
        birth,
      };

      await Users.createUser(users);
      res.status(200).json({ msg: '회원가입에 성공하셨습니다.' });
    } catch (error: any) {
      res.status(400).json({ msg: error.message });
      next(error);
    }
  },

  //로그인
  login: async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Get the user from the collection
      const { email, password } = await Joi.loginSchema.validateAsync(req.body);

      // Create the Access and refresh Tokens
      const { access_token, refresh_token, myhomeId } = await Users.userLogin(
        email,
        password
      );

      // Send Access Token in Cookie
      res.cookie('access_token', access_token, accessTokenCookieOptions);
      res.cookie('refresh_token', refresh_token, refreshTokenCookieOptions);
      res.cookie('logged_in', true, {
        ...accessTokenCookieOptions,
        httpOnly: false,
      });

      // Send Access Token
      res.status(200).json({
        status: 'success',
        access_token,
        myhomeId,
      });
    } catch (error: any) {
      res.status(400).json({ msg: error.message });
      next(error);
    }
  },

  refreshAccessTokenHandler: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      // Get the refresh token from cookie
      const refresh_token = req.cookies.refresh_token as string;

      // Validate the Refresh token
      const decoded = verifyJwt<{ sub: string }>(refresh_token);
      const message = 'Could not refresh access token';
      if (!decoded) {
        return next(new AppError(message, 403));
      }

      // Check if the user has a valid session
      const session = await redis.get(decoded.sub);
      if (!session) {
        return next(new AppError(message, 403));
      }

      // Check if the user exist
      const user = await Users.findUserMyhome(JSON.parse(session).userId);

      if (!user) {
        return next(new AppError(message, 403));
      }

      // Sign new access token
      const access_token = signJwt({ sub: user.userId });

      // Send the access token as cookie
      res.cookie('access_token', access_token, accessTokenCookieOptions);
      res.cookie('logged_in', true, {
        ...accessTokenCookieOptions,
        httpOnly: false,
      });

      // Send response
      res.status(200).json({
        status: 'success',
        access_token,
      });
    } catch (error: any) {
      res.status(400).json({ msg: error.message });
      next(error);
    }
  },

  // //로그인
  // login: async (req: Request, res: Response, next: NextFunction) => {
  //   passport.authenticate('local', (authError, user, info) => {
  //     if (authError) {
  //       res.status(400).json({ msg: 'authError' });
  //       return next(authError);
  //     }

  //     if (!user) return res.status(400).json({ msg: info.message });

  //     return req.login(user, async (loginError) => {
  //       if (loginError) {
  //         res.status(400).json({ msg: 'loginError' });
  //         return next(loginError);
  //       }

  //       const myhome = await Users.findUserMyhome(user.userId);

  //       return res.status(200).json({
  //         myhomeId: myhome.myhomeId,
  //         msg: '로그인에 성공하였습니다',
  //       });
  //     });
  //   })(req, res, next);
  // },

  logout: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { user } = res.app.locals;
      await redis.del(user.userId);
      res.cookie('access_token', '', { maxAge: 1 });
      res.cookie('refresh_token', '', { maxAge: 1 });
      res.cookie('logged_in', '', {
        maxAge: 1,
      });
      res.status(400).json({ msg: '로그아웃 되었습니다.' });
    } catch (error: any) {
      res.status(400).json({ msg: error.message });
      next(error);
    }
  },

  //이메일 중복
  emailCheck: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email } = await Joi.emailCheckSchema.validateAsync(req.body);

      const emailCheck = await Users.emailDuplicates(email);
      if (emailCheck) throw new Error('이미 등록된 사용자입니다.');

      res.status(200).send({ msg: '사용가능한 이메일입니다.' });
    } catch (error: any) {
      res.status(400).json({ msg: error.message });
      next(error);
    }
  },

  surfing: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await Users.surfing();
      res.status(200).send({ data: result!.myhomeId });
    } catch (error: any) {
      res.status(400).json({ msg: error.message });
      next(error);
    }
  },

  myhome: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { myhomeId } = req.params;
      await Users.todayTotal(req);
      const result = await Users.findByMyhome(+myhomeId);
      res.status(200).send({ data: result });
    } catch (error: any) {
      res.status(400).json({ msg: error.message });
      next(error);
    }
  },

  intro: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { myhomeId } = req.params;
      const { intro } = req.body;
      const { userId } = res.app.locals.user;
      const findMyHome = await Users.findByMyhome(+myhomeId);

      if (!findMyHome) throw new Error('잘못된 요청입니다.');
      if (userId != findMyHome.userId)
        throw new Error('본인 소개글만 수정가능합니다.');

      await Users.introupdate(+myhomeId, intro);
      res.status(200).json({ msg: 'intro가 수정되었습니다' });
    } catch (error: any) {
      res.status(400).json({ msg: error.message });
      next(error);
    }
  },

  //도토리
  // chargeDotori: async (req: Request, res: Response, next: NextFunction) => {
  //   try {
  //     const price = await Users.chargeDotori(req, res);
  //     res.status(200).send({ msg: `도토리 ${price}개가 충전되었습니다.` });
  // } catch (error: any) {
  //   res.status(400).json({ msg: error.message });
  // next(error);
  // }
  // };

  // chargeCoupons: (req: Request, res: Response, next: NextFunction) => {
  //   try {
  //     res.status(200).send({ msg: `쿠폰으로 ${coupon}개가 충전되었습니다.` });
  // } catch (error: any) {
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
    } catch (error: any) {
      res.status(400).json({ msg: error.message });
      next(error);
    }
  },
};
