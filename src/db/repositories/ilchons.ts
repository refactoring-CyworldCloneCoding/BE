import { IlchonInfo } from '../../interfaces/ilchon';
import { Ilchons } from '../entities';

class IlchonsRepository {
  ask = async (createIlchon: IlchonInfo) => {
    const info = Ilchons.create({ ...createIlchon });

    await Ilchons.save(info);
  };

  getList = async (userId: number) => {
    return await Ilchons.find({ where: { reqId: userId } });
  };

  reAsk = async (ilchonReAsk: IlchonInfo, ilchonId: number) => {
    const findIlchon = await this.findIlchon(ilchonId);

    Object.keys(ilchonReAsk).forEach((key) => {
      findIlchon[key] = ilchonReAsk[key];
    });

    await Ilchons.save(findIlchon);
  };

  outcome = async (ilchonId: number, state) => {
    const findIlchon = await this.findIlchon(ilchonId);
    findIlchon.state = state;
    await Ilchons.save(findIlchon);
  };

  deleteIlchon = async (ilchonId: number) => {
    await Ilchons.delete(ilchonId);
  };

  findIlchon = async (ilchonId: number) => {
    return await Ilchons.findOne({ where: { ilchonId } });
  };

  findAsk = async (userId: number) => {
    return await Ilchons.find({ where: { reqId: userId } });
  };

  findOutcome = async (userId: number) => {
    return await Ilchons.find({ where: { resId: userId } });
  };
}

export default new IlchonsRepository();
