import passport from 'passport';
import { Users } from '../db/entities';
import { Users as UsersEntity, Myhomes } from '../db/repositories';
import { Strategy as KakaoStrategy } from 'passport-kakao';
import env from '../config.env';

export default () => {
  passport.use(
    new KakaoStrategy(
      {
        clientID: env.KAKAO_ID,
        callbackURL: '/api/auth/kakao/callback',
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          const exUser = await Users.findOne({
            where: { snsId: profile.id, provider: 'kakao' },
            relations: { myhome: true },
          });

          if (exUser) {
            done(null, exUser);
            console.log(exUser, '카카오 로그인 성공!');
          } else {
            const email =
              profile._json.kakao_account.email.split('@')[0] + 'cyworld.com';
            const newUser = await UsersEntity.createUser({
              email,
              name: profile.username,
              snsId: profile.id,
              gender: profile._json.kakao_account.gender,
              birth: profile._json.kakao_account.birthday,
              provider: 'kakao',
            });

            const profileImage =
              profile._json.kakao_account.gender === '남자'
                ? `${env.S3_STORAGE_URL}default/boy.png`
                : `${env.S3_STORAGE_URL}default/girl.png`;

            await Myhomes.createNewMyhome(newUser.userId, profileImage);

            done(null, newUser);
          }
        } catch (error) {
          done(error);
        }
      }
    )
  );
};
