import express, { Request, Response, NextFunction } from 'express';
import passport from 'passport';
import { refresh, signJwt } from '../../utils/jwt';
import redis from '../../db/cache/redis';

const router = express.Router();

const kakaoCallback = (req: Request, res: Response, next: NextFunction) => {
  try {
    passport.authenticate(
      'kakao',
      { failureRedirect: '/users/login' },
      async (err, user, info) => {
        if (err) return next(err);
        const { userId, email } = user;

        const accesstoken = signJwt({ userId });
        const refreshtoken = refresh({ userId });

        await redis.set(userId, JSON.stringify({ userId, refreshtoken }), {
          EX: 60 * 60 * 24 * 7,
        });

        const result = {
          myhomeId: user.myhome.myhomeId,
          authorization: 'Bearer ' + accesstoken,
        };
        res.status(201).json({
          user: result,
          message: '카카오 로그인에 성공하셨습니다',
        });
      }
    )(req, res, next);
  } catch (error) {
    next(error);
  }
};

// 로그인페이지로 이동
router.get(
  '/auth/kakao',
  passport.authenticate('kakao', {
    scope: ['profile_nickname', 'account_email', 'gender', 'birthday'],
  })
);
// 카카오에서 설정한 redicrect url을 통해 요청 재전달
router.get('/auth/kakao/callback', kakaoCallback);

export default router;
