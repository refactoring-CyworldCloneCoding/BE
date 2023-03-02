import { Users, MyhomeCounts, Myhomes } from '../models';
import { TodayForm } from '../../interfaces/myHome';

interface MyhomeCreateForm {
  userId: number;
  intro: string;
  today: number;
  total: number;
}

class MyhomesRepositories extends Myhomes {
  constructor() {
    super();
  }
  createNewMyhome = async (userId: number) => {
    const createForm: MyhomeCreateForm = {
      userId,
      intro: '',
      today: 0,
      total: 0,
    };
    await Myhomes.create(createForm);
  };

  findUserMyhome = async (userId: number) => {
    return await Myhomes.findOne({
      where: { userId },
      include: [
        {
          model: Users,
          attributes: { exclude: ['password'] },
        },
      ],
    });
  };

  findByMyhome = async (myhomeId: number) => {
    return await Myhomes.findOne({
      where: { myhomeId },
      include: [
        {
          model: Users,
          attributes: { exclude: ['password'] },
        },
      ],
    });
  };

  findMaxHome = async () => {
    return Myhomes.findOne({
      order: [['myhomeId', 'desc']],
    });
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
