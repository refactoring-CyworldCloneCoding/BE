import { Myhomes } from '../db/entities';

class TodayInits {
  myhomesTodayInit = async () => {
    const findAllMyhomes = await Myhomes.find();
    findAllMyhomes.forEach(async (myhome) => {
      myhome.today = 0;
      await Myhomes.save(myhome);
    });
  };

  is2AM = () => {
    const now = new Date();
    return now.getHours() === 0 && now.getMinutes() === 0;
  };

  initStart = async () => {
    const interval = setInterval(async () => {
      if (this.is2AM()) {
        clearInterval(interval);
        await this.myhomesTodayInit();
        setInterval(() => this.myhomesTodayInit(), 24 * 60 * 60 * 1000);
      }
    }, 60 * 1000);
  };
}

export default new TodayInits();
