import { MyhomeCounts, Myhomes } from '../models';
import { TodayForm } from '../../interfaces/myHome';

class MyhomesRepositories extends Myhomes {
  constructor() {
    super();
  }
  findByMyhome = async (myhomeId: number) => {
    return await Myhomes.findByPk(myhomeId);
  };

  todayTotalCheck = async (myhomeId: number, ip: string) => {
    return await MyhomeCounts.findOne({ where: { ip, myhomeId } });
  };

  createTodayTotal = async ({ myhomeId, ip, time }: TodayForm) => {
    if (myhomeId) await MyhomeCounts.create({ myhomeId, ip, time });
    await Myhomes.increment({ today: 1, total: 1 }, { where: { myhomeId } });
  };

  todayTotalCount = async ({ ip, time, myhomeId }: TodayForm) => {
    await MyhomeCounts.update({ time }, { where: { ip, myhomeId } });
    await Myhomes.increment({ today: 1, total: 1 }, { where: { myhomeId } });
  };

  newTodayTotal = async ({ ip, time, myhomeId }: TodayForm) => {
    await MyhomeCounts.update({ time }, { where: { ip, myhomeId } });
    await Myhomes.increment({ total: 1 }, { where: { myhomeId } });
    await Myhomes.update({ today: 1 }, { where: { myhomeId } });
  };

  introUpdate = async (myhomeId: number, intro: string) => {
    const introupdate = await Myhomes.update(
      { intro },
      { where: { myhomeId } }
    );
    return introupdate;
  };
}

export default new MyhomesRepositories();
