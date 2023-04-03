import { Request, Response } from 'express';
import { Ilchons, Users } from '../db/repositories';
import AppError from '../utils/appError';
import datetime from '../utils/datetime';
import { IlchonInfo } from '../interfaces/ilchon';

class IlchonsService {
  ask = async (createIlchon: IlchonInfo) => {
    if (createIlchon.reqId === createIlchon.resId)
      throw new AppError('잘못된 요청입니다.', 400);

    const findOutcome = await Ilchons.findOutcome(createIlchon.reqId);

    findOutcome.map((ilchon) => {
      if (ilchon.resId === createIlchon.reqId)
        throw new AppError('잘못된 요청입니다.', 400);
    });

    await Ilchons.ask(createIlchon);
  };

  getList = async (userId: number) => {
    const findIlchons = await Ilchons.getList(userId);

    const standby = findIlchons.filter((ilchon) => ilchon.state === 'standby');
    const reAsk = findIlchons.filter((ilchon) => ilchon.state === 'reAsk');
    const accept = findIlchons.filter((ilchon) => ilchon.state === 'accept');
    const refuse = findIlchons.filter((ilchon) => ilchon.state === 'refuse');

    return { standby, reAsk, accept, refuse };
    // return findIlchons;
  };

  reAsk = async (req: Request) => {
    const { ilchonId } = req.params;
    const { reqId, resId, reqName, resName, reqIlchonName, resIlchonName } =
      req.body;

    const findIlchon = await Ilchons.findIlchon(Number(ilchonId));
    if (!findIlchon) throw new AppError('잘못된 요청입니다.', 400);

    const ilchonReAsk: IlchonInfo = {
      reqId,
      resId,
      reqName,
      resName,
      reqIlchonName,
      resIlchonName,
      state: 'reAsk',
    };

    await Ilchons.reAsk(ilchonReAsk, Number(ilchonId));

    return '재신청이 완료되었습니다.';
  };

  accept = async (req: Request) => {
    const { ilchonId } = req.params;
    const { state } = req.body;
    const findIlchon = await Ilchons.findIlchon(Number(ilchonId));
    if (!findIlchon) throw new AppError('잘못된 요청입니다.', 400);

    await Ilchons.outcome(Number(ilchonId), state);

    return '일촌신청을 수락하였습니다.';
  };

  refuse = async (req: Request) => {
    const { ilchonId } = req.params;
    const { state } = req.body;
    const findIlchon = await Ilchons.findIlchon(Number(ilchonId));
    if (!findIlchon) throw new AppError('잘못된 요청입니다.', 400);

    await Ilchons.outcome(Number(ilchonId), state);

    return '일촌신청을 거절하였습니다.';
  };

  deleteIlchon = async (ilchonId: number) => {
    const findIlchon = await Ilchons.findIlchon(ilchonId);
    if (!findIlchon) throw new AppError('잘못된 요청입니다.', 400);

    await Ilchons.deleteIlchon(ilchonId);
  };

  validation = async (req: Request): Promise<IlchonInfo> => {
    const { reqId, resId, reqName, resName, reqIlchonName, resIlchonName } =
      req.body;

    if (
      !reqId ||
      !resId ||
      !reqName ||
      !resName ||
      !reqIlchonName ||
      !resIlchonName
    )
      throw new AppError('입력하지 않은 항목이 있습니다.', 400);

    const findReqUser = await Users.findByUser(Number(reqId));
    const findResUser = await Users.findByUser(Number(resId));
    if (!findReqUser || !findResUser)
      throw new AppError('잘못된 요청입니다.', 400);

    return {
      reqId,
      resId,
      reqName,
      resName,
      reqIlchonName,
      resIlchonName,
    };
  };
}

export default new IlchonsService();
