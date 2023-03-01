// import { Request, Response, NextFunction } from 'express';
// import jwt from 'jsonwebtoken';
// import { Users } from '../db/models'
// import env from '../config.env'

// export default async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     console.log(req.headers);

//     const { accesstoken, refreshtoken } = req.cookies;
//     // const { accesstoken, refreshtoken } = req.headers;
//     if (!accesstoken || !refreshtoken) {
//       throw new Error('로그인 후 사용하세요');
//     }

//     const givemeAccess = accessValidate(accesstoken);
//     const givemeRefresh = refreshValidate(refreshtoken);

//     function accessValidate(accesstoken: string) {
//       try {
//         if (accesstoken === undefined) return false;
//         jwt.verify(accesstoken, env.SECRET_KEY);
//         return true;
//       } catch (error) {
//         return false;
//       }
//     }

//     function refreshValidate(refreshtoken: string) {
//       try {
//         if (refreshtoken === undefined) return false;
//         jwt.verify(refreshtoken, env.SECRET_KEY);
//         return true;
//       } catch (error) {
//         return false;
//       }
//     }

//     if (!givemeRefresh)
//       return res.status(419).json({ message: '다시 로그인 해주시길 바랍니다' });

//     if (!givemeAccess) {
//       const { userId } = jwt.verify(refreshtoken, env.SECRET_KEY);

//       const newAccessToken = jwt.sign({ userId: userId }, env.SECRET_KEY, {
//         expiresIn: '10d',
//       });

//       const user = await Users.findByPk(userId);

//       res.cookie('accessToken', newAccessToken);
//       console.log('토큰 재발급 되었습니다');

//       res.locals.user = user;
//     } else {
//       const { userId } = jwt.verify(accesstoken, env.SECRET_KEY);
//       const user = await Users.findByPk(userId);
//       res.locals.user = user;
//     }
//     next();
//   } catch (error) {
//     console.trace(error);
//     return res.status(403).send({
//       errorMessage: '로그인이 필요합니다.',
//     });
//   }
// };
