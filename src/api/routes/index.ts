import { Router } from "express";
// import passport = require("../passport");

import usersRouter from './users';
import ilchonpyungsRouter from './ilchonpyungs';
import diariesRouter from './diaries';
import commentsRouter from './comments';
import guestBooksRouter from './guestBooks';
// import kakaoRouter from './kakao';
// import googleRouter from './google';

const router = Router();

router.use('/users', usersRouter);
router.use('/bests', ilchonpyungsRouter);
router.use('/coupons', usersRouter);

router.use('/diaries', diariesRouter);
router.use('/diaries/comments', commentsRouter);
router.use('/guestbooks', guestBooksRouter);

// router.use('/', kakaoRouter);
// router.use('/', googleRouter);

export default router;
