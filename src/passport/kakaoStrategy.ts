// import passport from 'passport';
// import { Strategy as kakaoStrategy } from 'passport-kakao';
// import { Users } from '../db/models';
// import env from '../config.env';

// export default ()=>{
//     passport.use(
//     new kakaoStrategy(
//         {
//             clientID: env.KAKAO_ID,
//             callbackURL:"/api/auth/kakao/callback"
//         },
//         async (accessToken, refreshToken, profile, done) => {
//             try {
//                 const exUser = await Users.findOne({
//                     where: { snsId: profile.id, provider: 'kakao' },
//                 });
    
//                 if (exUser) {
//                 done(null, exUser);
//                 console.log(exUser, '카카오 로그인 성공!');
//                 } else {
//                 const newUser = await Users.create({
//                   email: profile._json.kakao_account.email,
//                   password: "123",
//                   name: profile.username!,
//                   snsId: profile.id,
//                   gender: profile._json.kakao_account.gender,
//                   birth: profile._json.kakao_account.birthday,
//                   provider: 'kakao',
//                 });
//                 done(null, newUser);
//             }
//             } catch (error) {
//             done(error);
//             }
//         }
//         )
//     );
// };
    