import { Router } from 'express';
import { Comments } from '../controllers';
import auth from '../../middlewares/auth';

const router = Router();

router.get('/:myhomeId/:diaryId', Comments.getComment);
router.post('/:myhomeId/:diaryId', auth.isNotLoggedIn, Comments.createComment);
router.put('/:commentId', auth.isNotLoggedIn, Comments.updataComment);
router.delete('/:commentId', auth.isNotLoggedIn, Comments.deleteComment);

export default router;
