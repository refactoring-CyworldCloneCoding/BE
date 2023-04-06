import { Request, Response } from 'express';
import { Ilchons, Users } from '../db/repositories';
import AppError from '../utils/appError';
import { IlchonInfo } from '../interfaces/ilchon';

class IlchonsService {
  ask = async (createIlchon: IlchonInfo) => {
    if (createIlchon.senderId === createIlchon.recipientId)
      throw new AppError('잘못된 요청입니다.', 400);

    const findOutcome = await Ilchons.findOutcome(createIlchon.senderId);

    findOutcome.map((ilchon) => {
      if (ilchon.recipientId === createIlchon.senderId)
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

  reAsk = async (req: Request, res: Response) => {
    const { ilchonId } = req.params;
    const ilchonValidation = await this.validation(req, res);

    const findIlchon = await Ilchons.findIlchon(Number(ilchonId));
    if (!findIlchon) throw new AppError('잘못된 요청입니다.', 400);

    const ilchonReAsk: IlchonInfo = {
      ...ilchonValidation,
      state: 'reAsk',
    };

    await Ilchons.reAsk(ilchonReAsk, Number(ilchonId));

    return '재신청이 완료되었습니다.';
  };

  accept = async (req: Request, res: Response) => {
    const { ilchonId } = req.params;
    const { state } = req.body;
    const findIlchon = await Ilchons.findIlchon(Number(ilchonId));
    if (!findIlchon) throw new AppError('잘못된 요청입니다.', 400);

    await Ilchons.outcome(Number(ilchonId), state);

    return '일촌신청을 수락하였습니다.';
  };

  refuse = async (req: Request, res: Response) => {
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

  validation = async (req: Request, res: Response): Promise<IlchonInfo> => {
    const { recipientId, senderIlchonName, recipientIlchonName } = req.body;
    const { userId } = res.app.locals.user;

    if (!recipientId || !senderIlchonName || !recipientIlchonName)
      throw new AppError('입력하지 않은 항목이 있습니다.', 400);

    const findSenderUser = await Users.findByUser(Number(userId));
    const findRecipientUser = await Users.findByUser(Number(recipientId));
    if (!findSenderUser || !findRecipientUser)
      throw new AppError('잘못된 요청입니다.', 400);

    return {
      senderId: Number(userId),
      recipientId,
      senderName: findSenderUser.name,
      recipientName: findRecipientUser.name,
      senderIlchonName,
      recipientIlchonName,
    };
  };
}

export default new IlchonsService();
