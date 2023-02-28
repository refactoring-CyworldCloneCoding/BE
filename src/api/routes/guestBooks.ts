import { Router } from 'express';
import { Guestbooks } from '../controllers';
import auth from '../../middlewares/auth';

const router = Router();

router
  .route('/:guestbookId/:userId')
  /**
   * PUT : 해당 미니홈피의 방명록 수정,
   * DELETE : 해당 미니홈피의 방명록 삭제
   */
  // .put(auth, Guestbooks.updateBook)
  .delete(auth.authMiddleware, Guestbooks.deleteBook);

router
  .route('/:userId')
  /**
   * POST : 해당 미니홈피의 방명록 작성,
   * GET : 해당 미니홈피의 방명록 조회
   */
  .post(auth.authMiddleware, Guestbooks.createBook)
  .get(Guestbooks.getBooks);

export default router;
