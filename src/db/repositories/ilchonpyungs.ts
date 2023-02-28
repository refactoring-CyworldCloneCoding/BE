import { Ilchonpyungs, Users } from '../models';

class IlchonpyungsRepository {
  createBest = async (best) => {
    await Ilchonpyungs.create(best);
  };

  findByWriter = async (userId, writerId) => {
    return await Ilchonpyungs.findOne({
      where: { userId, writerId },
    });
  };

  // 일촌평 목록 조회 시 ilchonpyungId 기준 내림차순 조회
  getBests = async (userId) => {
    return await Ilchonpyungs.findAll({
      where: { userId },
      order: [['ilchonpyungId', 'desc']],
    });
  };

  findByBest = async (ilchonpyungId) => {
    return await Ilchonpyungs.findByPk(ilchonpyungId);
  };

  deleteBest = async (userId, ilchonpyungId) => {
    await await Ilchonpyungs.destroy({
      where: { userId, ilchonpyungId },
    });
  };

  findByUser = async (userId) => {
    return await Users.findByPk(userId);
  };
}

export default new IlchonpyungsRepository();
