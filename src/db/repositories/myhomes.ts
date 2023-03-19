import { Users, MyhomeCounts, Myhomes } from '../entities';
import { TodayForm } from '../../interfaces/myHome';

class MyhomesRepositories extends Myhomes {
  constructor() {
    super();
  }
  createNewMyhome = async (userId: number) => {
    const saveMyhome = Myhomes.create({
      userId,
      user: await Users.findOne({ where: { userId } }),
    });
    return await Myhomes.save(saveMyhome);
  };

  findUserMyhome = async (userId: number) => {
    return await Myhomes.findOne({
      where: { userId },
      relations: { user: true },
    });
  };

  findByMyhome = async (myhomeId: number) => {
    return await Myhomes.findOne({
      where: { myhomeId },
      relations: { user: true },
    });
  };

  findMaxHome = async () => {
    const myhomes = await Myhomes.find();
    const myhomeMaxId = myhomes[myhomes.length - 1].myhomeId;
    return await Myhomes.findOne({
      where: { myhomeId: myhomeMaxId },
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

  introUpdate = async (myhomeId: number, intro: string) => {
    const findMyhome = await Myhomes.findOne({ where: { myhomeId } });
    findMyhome.intro = intro;
    await Myhomes.save(findMyhome);
    return findMyhome;
  };
}

export default new MyhomesRepositories();
