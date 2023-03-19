import { Users } from '../entities';
import { UserInfo } from '../../interfaces/user';

class UsersRepositories extends Users {
  constructor() {
    super();
  }
  createUser = async (user: UserInfo): Promise<Users> => {
    return await Users.save(user);
  };

  findOneId = async (userId: number) => {
    return await Users.findOne({
      where: { userId },
      relations: { myhome: true },
    });
  };

  findOneEmail = async (email: string) => {
    return await Users.findOne({
      where: { email },
      relations: { myhome: true },
    });
  };

  findMaxUser = async () => {
    const users = await Users.find();
    const userMaxId = users[users.length - 1].userId;
    return await Users.findOne({
      where: { userId: userMaxId },
    });
  };

  findByUser = async (userId: number) => {
    return Users.findOne({
      where: { userId },
      relations: { myhome: true },
    });
  };

  findAllUsers = async () => {
    return Users.find({ relations: { myhome: true } });
  };

  // chargeDotori = async (userId, price) => {
  //   const isDotori = await this.findByUser(userId);
  //   if (isDotori.dotori === null)
  //     await Users.update({ dotori: 0 }, { where: { userId } });
  //   return await Users.increment({ dotori: price }, { where: { userId } });
  // };

  // findCoupon = async (coupon) => {
  //   return await Coupons.findOne({
  //     where: { coupon },
  //   });
  // };

  // afterCoupon = async (couponId) => {
  //   await Coupons.update(
  //     { status: 'x' },
  //     {
  //       where: { couponId },
  //     }
  //   );
  // };

  // chargeCoupons = async () => {};
}

export default new UsersRepositories();
