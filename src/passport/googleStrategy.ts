import passport from 'passport';
import { Strategy as googleStrategy } from 'passport-google-oauth20';
import { Users } from '../db/models';
import env from '../config.env';

// 구글 로그인
export default () => {
  passport.use(
    new googleStrategy(
      {
        clientID: env.GOOGLE_ID,
        clientSecret: env.GOOGLE_SECRET,
        callbackURL: '/api/auth/google/callback',
      },

      async (accessToken, refreshToken, profile, done) => {
        try {
          const exUser = await Users.findOne({
            where: { snsId: profile.id, provider: 'google' },
          });
          console.log(profile._json);
          if (exUser) {
            done(null, exUser);
          } else {
            const newUSer = await Users.create({
              email: profile._json.email!,
              password: '123',
              name: profile._json.name!,
              snsId: profile.id,
              gender: 'default',
              birth: 'default',
              provider: 'google',
            });
            done(null, newUSer);
          }
        } catch (error) {
          done();
        }
      }
    )
  );
};
