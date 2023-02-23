const express = require('express');
const router = express.Router();
// const passport =require('passport')

router.use('/users', require('./users.routes'));
router.use('/bests', require('./ilchonpyungs.routes'));
router.use('/coupons', require('./users.routes'));

router.use('/diaries', require('./diaries.routes'));
router.use('/diaries/comments', require('./comments.routes'));
router.use('/guestbooks', require('./guestBooks.routes'));
router.use('/', require('./kakao.routes'));
router.use('/', require('./google.routes'));
module.exports = router;
