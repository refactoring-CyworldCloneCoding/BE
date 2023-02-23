require('dotenv').config();
const passport = require('passport');
const googleStrategy = require('passport-google-oauth20').Strategy;
const { Users } = require('../models');

// 구글 로그인
module.exports = () => {
passport.use(
    new googleStrategy(
        {
            clientID: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET,
            callbackURL: '/api/auth/google/callback',
        },

        async (accessToken, refreshToken, profile, done) => {
        try {
            const exUser = await Users.findOne({
            where: { snsId: profile.id, provider: 'google' },
            });
           console.log(profile._json)
            if (exUser) {
            done(null, exUser);
            } else {
            const newUSer = await Users.create({
                snsId: profile.id,
                name : profile._json.name,
                provider: 'google',
                email: profile._json.email
            });
            done(null, newUSer);
            }
        } catch (error) {
            done(error);
        }
        }
    )
    );
};