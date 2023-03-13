import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Users } from '../db/models';
import bcrypt from 'bcrypt';

export default () => {
  passport.use(
    new LocalStrategy(
      {
        usernameField: 'email', // req.body.email
        passwordField: 'password', // req.body.password
      },
      async (email, password, done) => {
        try {
          const exUser = await Users.findOne({ where: { email } });
          if (exUser) {
            const result = await bcrypt.compare(password, exUser.password);
            if (result) done(null, exUser);
            else done(null, false, { message: '비밀번호가 일치하지 않습니다.' });
          }
          else done(null, false, { message: '가입되지 않은 회원입니다.' });
        } catch (error) {
          done(error); 
        }
      }
    )
  );
};
