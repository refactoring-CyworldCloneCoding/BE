import { Router } from 'express';
import auth from '../../middlewares/auth';

import usersRouter from './users';
import ilchonsRouter from './ilchons';
import ilchonpyungsRouter from './ilchonpyungs';
import diariesRouter from './diaries';
import commentsRouter from './comments';
import guestBooksRouter from './guestBooks';
import kakaoRouter from './kakao';

const router = Router();

router.use('/users', usersRouter);
router.use('/ilchons', ilchonsRouter);
router.use('/bests', ilchonpyungsRouter);
router.use('/coupons', usersRouter);

router.use('/diaries', diariesRouter);
router.use('/comments', commentsRouter);
router.use('/guestbooks', guestBooksRouter);

router.use('/', auth.isLoggedIn, kakaoRouter);

export default router;
