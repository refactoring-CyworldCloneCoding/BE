import { Myhomes } from '../db/models';

class TodayInits {
  myhomesTodayInit = async () => {
    await Myhomes.update({ today: 0 }, { where: {} });
  };

  is2AM = () => {
    const now = new Date();
    return now.getHours() === 2 && now.getMinutes() === 0;
  };

  initStart = async () => {
    const interval = setInterval(async () => {
      console.log('initStart!!!');
      if (this.is2AM()) {
        clearInterval(interval);
        await this.myhomesTodayInit();
        setInterval(() => this.myhomesTodayInit(), 24 * 60 * 60 * 1000);
      }
    }, 60 * 1000);
  };
}

export default new TodayInits();
