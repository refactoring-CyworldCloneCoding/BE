import { Router } from 'express';
import { Comments } from '../controllers';
import auth from '../../middlewares/auth';

const router = Router();

router.get('/:userId', Comments.getComment);
router.post('/:diaryId/:userId', auth.authMiddleware, Comments.createComment);
router.put('/:diaryId/:commentId', auth.authMiddleware, Comments.updataComment);
router.delete('/:diaryId/:commentId', auth.authMiddleware, Comments.deleteComment);

export default router;
