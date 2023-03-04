import { Router } from 'express';
import { Comments } from '../controllers';
import auth from '../../middlewares/auth';

const router = Router();

router.get('/:myhomeId/:diaryId', Comments.getComment);
router.post('/:myhomeId/:diaryId', auth.authMiddleware, Comments.createComment);
router.put('/:commentId', auth.authMiddleware, Comments.updataComment);
router.delete('/:commentId', auth.authMiddleware, Comments.deleteComment);

export default router;
