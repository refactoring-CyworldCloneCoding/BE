import { Request, Response, NextFunction } from 'express';
import { Users } from '../../services';
import Joi from '../../utils/joi';
import bcrypt from 'bcrypt';
import { UserInfo } from '../../interfaces/user';

export default {
  signup: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, name, password, confirm, gender, birth } =
        await Joi.signupSchema.validateAsync(req.body);

      if (!email || !name || !password || !confirm || !gender || !birth)
        throw new Error('형식을 확인해주세요.');

      if (password !== confirm)
        throw new Error('비밀번호가 일치하지 않습니다.');

      const emailcheck = await Users.emailDuplicates(email);
      if (emailcheck) throw new Error('이메일 중복검사를 해주세요.');

      if (name.includes(password) || password.includes(name))
        throw new Error('이름과 비밀번호를 다른형식으로 설정해주세요.');

      const hashed = await bcrypt.hash(password, 10);
      const users: UserInfo = {
        email,
        name,
        password: hashed,
        gender,
        birth,
      };

      await Users.createUser(users);
      res.status(200).json({ msg: '회원가입에 성공하셨습니다.' });
    } catch (error: any) {
      res.status(400).json({ msg: error.message });
      next(error);
    }
  },
  //로그인
  login: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = await Joi.loginSchema.validateAsync(req.body);
      const user = await Users.userLogin(email, password);

      res.cookie('accesstoken', user.accesstoken);
      res.cookie('refreshtoken', user.refreshtoken);
      res.status(200).json({ ...user, msg: '로그인에 성공하였습니다' });
    } catch (error: any) {
      res.status(400).json({ msg: error.message });
      next(error);
    }
  },

  //이메일 중복
  emailCheck: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email } = await Joi.emailCheckSchema.validateAsync(req.body);

      const emailCheck = await Users.emailDuplicates(email);
      if (emailCheck) throw new Error('이미 등록된 사용자입니다.');

      res.status(200).send({ msg: '사용가능한 이메일입니다.' });
    } catch (error: any) {
      res.status(400).json({ msg: error.message });
      next(error);
    }
  },

  surfing: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await Users.surfing();
      res.status(200).send({ data: result!.myhomeId });
    } catch (error: any) {
      res.status(400).json({ msg: error.message });
      next(error);
    }
  },

  myhome: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { myhomeId } = req.params;
      await Users.todayTotal(req);
      const result = await Users.findByMyhome(+myhomeId);
      res.status(200).send({ data: result });
    } catch (error: any) {
      res.status(400).json({ msg: error.message });
      next(error);
    }
  },

  intro: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { myhomeId } = req.params;
      const { intro } = req.body;
      const { userId } = res.app.locals.user;
      const findMyHome = await Users.findByMyhome(+myhomeId);

      if (!findMyHome) throw new Error('잘못된 요청입니다.');
      if (userId != findMyHome.userId)
        throw new Error('본인 소개글만 수정가능합니다.');

      await Users.introupdate(+myhomeId, intro);
      res.status(200).json({ msg: 'intro가 수정되었습니다' });
    } catch (error: any) {
      res.status(400).json({ msg: error.message });
      next(error);
    }
  },

  //도토리
  // chargeDotori: async (req: Request, res: Response, next: NextFunction) => {
  //   try {
  //     const price = await Users.chargeDotori(req, res);
  //     res.status(200).send({ msg: `도토리 ${price}개가 충전되었습니다.` });
  // } catch (error: any) {
  //   res.status(400).json({ msg: error.message });
  // next(error);
  // }
  // };

  // chargeCoupons: (req: Request, res: Response, next: NextFunction) => {
  //   try {
  //     res.status(200).send({ msg: `쿠폰으로 ${coupon}개가 충전되었습니다.` });
  // } catch (error: any) {
  //   res.status(400).json({ msg: error.message });
  // next(error);
  // }
  // };
};
