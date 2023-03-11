import { Users, MyhomeCounts, Myhomes } from '../models';
import { TodayForm } from '../../interfaces/myHome';

class MyhomesRepositories extends Myhomes {
  constructor() {
    super();
  }
  createNewMyhome = async (userId: number) => {
    const saveMyhome = Myhomes.create({
      userId,
      intro: '',
      today: 0,
      total: 0,
    });
    return await Myhomes.save(saveMyhome);
  };

  findUserMyhome = async (userId: number) => {
    return await Myhomes.findOne({
      where: { userId },
      // include: [
      //   {
      //     model: Users,
      //     attributes: { exclude: ['password'] },
      //   },
      // ],
    });
  };

  findByMyhome = async (myhomeId: number) => {
    return await Myhomes.findOne({
      where: { myhomeId },
      // include: [
      //   {
      //     model: Users,
      //     attributes: { exclude: ['password'] },
      //   },
      // ],
    });
  };

  findMaxHome = async () => {
    const myhomes = await Myhomes.find();
    const myhomeMaxId = myhomes[myhomes.length - 1].myhomeId;
    return await Myhomes.findOne({
      where: { myhomeId: myhomeMaxId },
      // order: [['myhomeId', 'desc']],
    });
  };

  todayTotalCheck = async (myhomeId: number, ip: string) => {
    return await MyhomeCounts.findOne({ where: { ip, myhomeId } });
  };

  createTodayTotal = async ({ myhomeId, ip, time }: TodayForm) => {
    if (myhomeId) {
      const newMyhomeCount = MyhomeCounts.create({ myhomeId, ip, time });
      await MyhomeCounts.save(newMyhomeCount);
    }
    const findMyhome = await Myhomes.findOne({ where: { myhomeId } });
    findMyhome.today++;
    findMyhome.total++;
    await Myhomes.save(findMyhome);
  };

  todayTotalCount = async ({ ip, time, myhomeId }: TodayForm) => {
    const findMyhomeCountTable = await MyhomeCounts.findOne({
      where: { ip, myhomeId },
    });
    findMyhomeCountTable.time = time;
    await MyhomeCounts.save(findMyhomeCountTable);
    const findMyhome = await Myhomes.findOne({ where: { myhomeId } });
    findMyhome.today++;
    findMyhome.total++;
    await Myhomes.save(findMyhome);
  };

  // newTodayTotal = async ({ ip, time, myhomeId }: TodayForm) => {
  //   await MyhomeCounts.update({ time }, { where: { ip, myhomeId } });
  //   await Myhomes.increment({ total: 1 }, { where: { myhomeId } });
  //   await Myhomes.update({ today: 1 }, { where: { myhomeId } });
  // };

  introUpdate = async (myhomeId: number, intro: string) => {
    const findMyhome = await Myhomes.findOne({where:{myhomeId}});
    findMyhome.intro = intro;
    await Myhomes.save(findMyhome);
    return findMyhome;
  };
}

export default new MyhomesRepositories();
