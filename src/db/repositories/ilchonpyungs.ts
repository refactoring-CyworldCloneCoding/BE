import { Ilchonpyungs } from '../models';

class IlchonpyungsRepository {
  createBest = async (CreateForm: CreateIlchonpyungForm) => {
    await Ilchonpyungs.create(CreateForm);
  };

  findByWriter = async (userId: number, myhomeId: number) => {
    return await Ilchonpyungs.findOne({
      where: { userId, myhomeId },
    });
  };

  // 일촌평 목록 조회 시 ilchonpyungId 기준 내림차순 조회
  getBests = async (myhomeId: number) => {
    return await Ilchonpyungs.findAll({
      where: { myhomeId },
      order: [['ilchonpyungId', 'desc']],
    });
  };

  findByBest = async (ilchonpyungId: number) => {
    return await Ilchonpyungs.findByPk(ilchonpyungId);
  };

  deleteBest = async (userId: number, ilchonpyungId: number) => {
    await await Ilchonpyungs.destroy({
      where: { userId, ilchonpyungId },
    });
  };

  // findByUser = async (myhomeId: number) => {
  //   return await Myhomes.findByPk(myhomeId);
  // };
}

export default new IlchonpyungsRepository();
