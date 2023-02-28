import { Router, Request, Response, NextFunction } from 'express';
import jwt from '../../utils/jwt';
import passport from 'passport';
import { Users } from '../../db/models'

const router = Router();

interface KakaoInfo {
  userId: number;
  accessToken: string;
  refreshToken: string;
  email: string;
}

const kakaoCallback = (req: Request, res: Response, next: NextFunction) => {
  let result: KakaoInfo;
  try {
    passport.authenticate(
      'kakao',
      { failureRedirect: '/users/login' },
      async (err: any, user: any, info: any) => {
        if (err) return next(err);
        const { userId, email } = user;

        const accessToken = jwt.sign({ userId: user.userId });
        const refreshToken = jwt.refresh();

        await Users.update(
          { refreshToken },
          { where: { userId: user.userId } }
        );

        result = { userId, accessToken, refreshToken, email };
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
