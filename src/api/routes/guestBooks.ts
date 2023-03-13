import { Router } from 'express';
import { Guestbooks } from '../controllers';
import auth from '../../middlewares/auth';

const router = Router();

router
  .route('/:guestbookId')
  /**
   * PUT : 해당 미니홈피의 방명록 수정,
   * DELETE : 해당 미니홈피의 방명록 삭제
   */
  .put(auth.isNotLoggedIn, Guestbooks.updateBook)
  .delete(auth.isNotLoggedIn, Guestbooks.deleteBook);

router
  .route('/:myhomeId')
  /**
   * POST : 해당 미니홈피의 방명록 작성,
   * GET : 해당 미니홈피의 방명록 조회
   */
  .post(auth.isNotLoggedIn, Guestbooks.createBook)
  .get(Guestbooks.getBooks);

export default router;
