// import passport from 'passport';
import { Users } from '../db/models';
import local from './localStrategy';
const passport = require('passport');
// import kakao from './kakaoStrategy';
// import google from './googleStrategy';

export default () => {
  passport.serializeUser((user, done) => {
    done(null, user.userId);
  });

  passport.deserializeUser((userId: number, done) => {
    Users.findOne({ where: { userId } })
      .then((user) => done(null, user))
      .catch((err) => done(err));
  });

  local();
  //kakao();
};
