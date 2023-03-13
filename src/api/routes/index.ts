import { Router } from "express";

import usersRouter from './users';
import ilchonpyungsRouter from './ilchonpyungs';
import diariesRouter from './diaries';
import commentsRouter from './comments';
import guestBooksRouter from './guestBooks';

const router = Router();

router.use('/users', usersRouter);
router.use('/bests', ilchonpyungsRouter);
router.use('/coupons', usersRouter);

router.use('/diaries', diariesRouter);
router.use('/comments', commentsRouter);
router.use('/guestbooks', guestBooksRouter);

export default router;
