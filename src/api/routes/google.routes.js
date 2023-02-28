const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken')
const passport = require('passport');
require('dotenv').config();
const {Users} =require('../models')

const googlecallback = (req,res,next)=>{
try{
    
  passport.authenticate(
    'google',
    {failureRedirect :'/users/login'},
    async(err, user, info)=>{
      if(err)return next(err);
      const {userId,email} = user;

      const accessToken = jwt.sign(
        {userId:user.userId},
        process.env.SECRET_KEY,
        {expiresIn:'7h'}
      );
        console.log(accessToken)
      const refreshToken = jwt.sign(
        {userId : user.userId},
        process.env.SECRET_KEY,
        {expiresIn:'21d'}
      );
      console.log('111111111')
      await Users.update(
        {refreshToken},
        {where: {userId : user.userId}}
      );

      result = {userId,accessToken,refreshToken,email};
      res.status(201).json({
        user:result,
        message : '구글 로그인에 성공하셨습니다',
      });

    }
  )(req,res,next);
}catch(error){
  next(error);
}
};

// 로그인페이지로 이동
router.get('/auth/google', passport.authenticate('google',{ scope: ['profile', 'email'] }));
// 구글에서 설정한 redicrect url을 통해 요청 재전달
router.get('/auth/google/callback', googlecallback);

module.exports = router;