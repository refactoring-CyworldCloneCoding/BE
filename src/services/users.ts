import { Request } from 'express';
import { Myhomes, Users } from '../db/repositories';
import jwt from '../utils/jwt';
import bcrypt from 'bcrypt';
import { UserInfo } from '../interfaces/user';

class UsersService {
  createUser = async (users: UserInfo) => {
    users.email += '@cyworld.com';

    await Users.createUser(users);
  };

  emailDuplicates = async (email: string) => {
    return await Users.findOneEmail(email + '@cyworld.com');
  };

  userLogin = async (email: string, password: string) => {
    const user = await Users.findOneEmail(email);
    if (!user) {
      throw new Error('가입하신 회원이 아닙니다.');
    }

    const isEqual = await bcrypt.compare(password, user.password);
    if (!isEqual) {
      throw new Error('비밀번호가 다릅니다.');
    }
    const accesstoken = jwt.sign({ userId: user.userId });
    const refreshtoken = jwt.refresh();
    // await Users.updateRefresh(refreshtoken, user);
    return { accesstoken, refreshtoken, userId: user.userId };
  };

  surfing = async () => {
    const maxUserId = await Users.findMaxUser();

    const random = Math.ceil(Math.random() * maxUserId!.userId);

    return await Users.findByUser(random);
  };

  todayTotal = async (req: Request) => {
    // 현재 사용중인 유저의 ip를 가져온다.
    const ipAdress: string = req.ip.split(':').pop()!;

    const { myhomeId } = req.params;

    const findByUser = await Myhomes.findByMyhome(+myhomeId);

    if (!findByUser) throw new Error('존재하지 않는 미니홈피 입니다.');

    const time = Date.now();

    // 중복된 아이피가 있는지 검증하기위해 repository 요청
    const existIp = await Myhomes.todayTotalCheck({
      ip: ipAdress,
      myhomeId,
    });

    // 중복된 아이피가 없으면 DB에 추가
    if (!existIp)
      return await Myhomes.createTodayTotal({
        myhomeId,
        ip: ipAdress,
        time,
      });
    // 이전 조회수 업데이트 날짜와 현재 날짜가 다를경우 today는 1로 초기화, total +1
    // 구현되는 것을 확인하기 위해 1분마다 today 초기화
    const day = new Date() + '';
    const myhomeDay = existIp.updatedAt + '';
    const intervalDay: boolean = parseInt(day.split(':')[1]) - parseInt(myhomeDay.split(':')[1]) === 0;

    if (!intervalDay)
      return await Myhomes.newTodayTotal({
        ip: ipAdress,
        time,
        myhomeId,
      });

    // 조회수를 무작정 올리는것을 방지하기 위한 5초 간격
    const intervalCount = time - parseInt(existIp.time) > 5000;

    // 조회수를 올린지 5초가 지났으면 조회수 요청 및 시간 업데이트 요청
    if (intervalCount)
      await Myhomes.todayTotalCount({
        ip: ipAdress,
        time: time.toString(),
        myhomeId,
      });
  };

  myhome = async (req: Request) => {
    const { userId } = req.params;
    return await Users.findByUser(+userId);
  };

  introupdate = async (userId: number, intro: string) => {
    await Myhomes.introUpdate(userId, intro);
  };

  //도토리
  // chargeDotori = async (req, res) => {
  //   // 1. 도토리 충전요청 받을때 직접 금약 입력과 쿠폰입력 2가지로 처리방식
  //   // 2. 예외처리로 둘다 입력안됬을 때와 둘다 입력했을때, 틀린 쿠폰번호 입력했을때
  //   const { userId } = res.locals.user;
  //   const { coupon, price } = req.body;

  //   // 두 방법으로 한번에 충전 시도시 예외처리.
  //   if (coupon && price)
  //     throw new Error('한 번에 하나의 방식으로만 충전 가능합니다.');

  //   // 충전 금액과 쿠폰 미입력시
  //   if (!coupon && !price)
  //     throw new Error('충전할 금액 혹은 쿠폰번호를 입력해주세요.');

  //   // if (isNaN(coupon) || isNaN(price)) throw new Error('숫자만 입력해주세요.');

  //   // 충전 금액 입력시 해당하는 도토리 비율만큼 충전
  //   if (!coupon && price) {
  //     if (price < 100) throw new Error('100원 이상부터 충전 가능합니다.');
  //     if (price % 100 !== 0) throw new Error('100원단위로 충전 가능합니다.');
  //     await Users.chargeDotori(userId, +price / 100);
  //   }

  //   // 쿠폰 입력시 해당하는 도토리 비율만큼 충전
  //   if (coupon && !price) {
  //     // 유효하지 않거나 사용된 쿠폰인지 확인
  //     const getCoupon = await Users.findCoupon(coupon);
  //     if (!getCoupon) throw new Error('없는 쿠폰입니다.');
  //     if (getCoupon.status === 'x') throw new Error('이미 사용된 쿠폰입니다.');

  //     // 도토리 충전 및 쿠폰 사용처리
  //     await Users.chargeDotori(userId, getCoupon.price);
  //     await Users.afterCoupon(getCoupon.couponId);
  //   }

  //   return price / 100;
  // };

  // chargeCoupons = async (req, res, next) => {
  //   const { boop } = req.body;
  //   await Users.chargeCoupons();
  // };
}
export default new UsersService();
