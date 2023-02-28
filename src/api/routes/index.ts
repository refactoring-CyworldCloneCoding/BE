import express from "express";
// import passport = require("../passport");
const router = express.Router();

router.use('/users', require('./users.mjs'));
router.use('/bests', require('./ilchonpyungs.routes'));
router.use('/coupons', require('./users.mjs'));

router.use('/diaries', require('./diaries.routes'));
router.use('/diaries/comments', require('./comments.routes'));
router.use('/guestbooks', require('./guestBooks.routes'));
router.use('/', require('./kakao.routes'));
router.use('/', require('./google.routes'));

export default router;
