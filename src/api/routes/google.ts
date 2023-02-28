import { Router, Request, Response, NextFunction } from 'express';
import jwt from '../../utils/jwt';
import passport from 'passport';
import { Users } from '../../db/models';

const router = Router();

interface googleInfo {
  userId: number;
  accessToken: string;
  refreshToken: string;
  email: string;
}

const googlecallback = (req: Request, res: Response, next: NextFunction) => {
  let result: googleInfo;
  try {
    passport.authenticate(
      'google',
      { failureRedirect: '/users/login' },
      async (err, user, info) => {
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
          message: '구글 로그인에 성공하셨습니다',
        });
      }
    )(req, res, next);
  } catch (error) {
    next(error);
  }
};

// 로그인페이지로 이동
router.get(
  '/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);
// 구글에서 설정한 redicrect url을 통해 요청 재전달
router.get('/auth/google/callback', googlecallback);

export default router;
