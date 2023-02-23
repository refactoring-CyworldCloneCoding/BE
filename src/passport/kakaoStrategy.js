const passport = require('passport');
const UsersController = require('../controllers/users.controllers');
const kakaoStrategy =require('passport-kakao').Strategy
const {Users} = require('../models')
require('dotenv').config();
module.exports=()=>{
    passport.use(
    new kakaoStrategy(
        {
            clientID: process.env.KAKAO_ID,
            callbackURL:"/api/auth/kakao/callback"
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                const exUser = await Users.findOne({
                    where: { snsId: profile.id, provider: 'kakao' },
                });
    
                if (exUser) {
                done(null, exUser);
                console.log(exUser, '카카오 로그인 성공!');
                } else {
                const newUser = await Users.create({
                    email : profile._json.kakao_account.email,
                    name : profile.username,
                    snsId: profile.id,
                    gender: profile._json.kakao_account.gender,
                    birth :profile._json.kakao_account.birthday,
                    provider: 'kakao',
                });
                done(null, newUser);
            }
            } catch (error) {
            done(error);
            }
        }
        )
    );
};
    