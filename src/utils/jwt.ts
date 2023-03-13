import env from '../config.env';
import jwt, { SignOptions } from 'jsonwebtoken';

// import { JwtPayload } from 'jsonwebtoken';

export const signJwt = (payload: Object, options: SignOptions = {}) => {
  const privateKey = Buffer.from(env.JWT_KEY, 'base64').toString('ascii');
  return jwt.sign(payload, privateKey, {
    ...(options && options),
    algorithm: 'RS256',
  });
};

export const verifyJwt = <T>(
  token: string,
): T | null => {
  try {
    const publicKey = Buffer.from(env.JWT_KEY, 'base64').toString('ascii');
    return jwt.verify(token, publicKey) as T;
  } catch (error) {
    return null;
  }
};


// export default {
//   sign: (payload: JwtPayload) => {
//     return jwt.sign(payload, env.JWT_KEY, {
//       algorithm: 'HS256',
//       expiresIn: 60 * 60 * 12,
//     });
//   },
//   verify: (accessToken: string) => {
//     try {
//       const payload = jwt.verify(accessToken, env.JWT_KEY);
//       return payload;
//     } catch (error) {
//       return null;
//     }
//   },
//   refresh: () => {
//     return jwt.sign({}, env.JWT_KEY, {
//       algorithm: 'HS256',
//       expiresIn: 60 * 60 * 24,
//     });
//   },
//   refreshVerify: function (refreshToken: string) {
//     return this.verify(refreshToken);
//   },
// };