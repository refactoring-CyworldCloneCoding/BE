import { Router } from 'express';
import { Ilchonpyungs } from '../controllers';
import auth from '../../middlewares/auth';

const router = Router();

router
  .route('/:ilchonpyungId/:userId')
  /**
   * DELETE : 해당 미니홈피의 일촌평 삭제
   */
  .delete(auth.authMiddleware, Ilchonpyungs.deleteBest);

router
  .route('/:userId')
  /**
   * POST : 해당 미니홈피의 일촌평 작성,
   * GET : 해당 미니홈피의 일촌평 목록 조회
   */
  .post(auth.authMiddleware, Ilchonpyungs.createBest)
  .get(Ilchonpyungs.getBests);

export default router;
