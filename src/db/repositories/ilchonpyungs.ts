import { Ilchonpyungs } from '../entities';
import { CreateIlchonpyungForm } from '../../interfaces/Ilchonpyung';

class IlchonpyungsRepository {
  createBest = async (CreateForm: CreateIlchonpyungForm) => {
    const ilchonpyungInfo = Ilchonpyungs.create(CreateForm);
    await Ilchonpyungs.save(ilchonpyungInfo);
  };

  findByWriter = async (userId: number, myhomeId: number) => {
    return await Ilchonpyungs.findOne({
      where: { userId, myhomeId },
    });
  };

  // 일촌평 목록 조회 시 ilchonpyungId 기준 내림차순 조회
  getBests = async (myhomeId: number) => {
    return await Ilchonpyungs.find({
      where: { myhomeId },
      // order: [['ilchonpyungId', 'desc']],
    });
  };

  findByBest = async (ilchonpyungId: number, myhomeId: number) => {
    return await Ilchonpyungs.findOne({
      where: { ilchonpyungId, myhomeId },
    });
  };

  updateBest = async ({
    ilchonpyungId,
    userId,
    ilchonpyung,
    nick,
  }: CreateIlchonpyungForm) => {
    const ilchonpyungInfo = await Ilchonpyungs.findOne({
      where: { ilchonpyungId },
    });
    ilchonpyungInfo.ilchonpyung = ilchonpyung;
    await Ilchonpyungs.save(ilchonpyungInfo);
    // await Ilchonpyungs.update(
    //   { ilchonpyung, nick },
    //   { where: { ilchonpyungId, userId } }
    // );
  };

  deleteBest = async (ilchonpyungId: number, myhomeId: number) => {
    await Ilchonpyungs.delete({ ilchonpyungId, myhomeId });
  };
}

export default new IlchonpyungsRepository();
