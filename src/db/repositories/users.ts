import { Users } from '../models';
import { UserInfo } from '../../interfaces/user';

class UsersRepositories extends Users {
  constructor() {
    super();
  }
  createUser = async (user: UserInfo) => {
    return await Users.save(user);
  };

  findOneId = async (userId: number) => {
    return await Users.findOne({ where: { userId } });
  };

  findOneEmail = async (email: string) => {
    return await Users.findOne({ where: { email } });
  };

  // findById = async (userId: number, email: string) => {
  //   const findById = await Users.findByPk({
  //     where: {
  //       [Op.and]: [{ userId }, { email }],
  //     },
  //   });
  //   return findById;
  // };

  // updateRefresh = async (refreshToken: string, user: Users) => {
  //   await Users.update({ refreshToken }, { where: { userId: user.userId } });
  // };

  // ----------------------------------------------------------------

  findMaxUser = async () => {
    const users = await Users.find();
    const userMaxId = users[users.length - 1].userId;
    return await Users.findOne({
      where: { userId: userMaxId },
      // order: [['userId', 'desc']],
    });
  };

  findByUser = async (userId: number) => {
    return Users.findOne({
      // attributes: {
      //   exclude: ['password'],
      // },
      where: { userId },
    });
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
