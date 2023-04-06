import { Request, Response, NextFunction } from 'express';
import { Ilchons } from '../../services';
import AppError from '../../utils/appError';

class IlchonsControllers {
  ask = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const createIlchon = await Ilchons.validation(req, res);

      await Ilchons.ask(createIlchon);

      res.status(201).json({ msg: '일촌신청이 완료되었습니다.' });
    } catch (error: any) {
      res.status(400).json({ msg: error.message });
      next(error);
    }
  };

  getList = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { userId } = req.params;

      const findIlchons = await Ilchons.getList(Number(userId));

      res.status(200).json(findIlchons);
    } catch (error: any) {
      res.status(400).json({ msg: error.message });
      next(error);
    }
  };

  outcome = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { state } = req.body;

      if (!state) throw new AppError('잘못된 요청입니다.', 400);

      const ilchonHandler = {
        reAsk: await Ilchons.reAsk(req, res),
        accept: await Ilchons.accept(req, res),
        refuse: await Ilchons.refuse(req, res),
      };

      const msg: string = ilchonHandler[state];

      res.status(200).json({ msg });
    } catch (error: any) {
      res.status(400).json({ msg: error.message });
      next(error);
    }
  };

  deleteIlchon = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { ilchonId } = req.params;
      await Ilchons.deleteIlchon(Number(ilchonId));

      res.status(200).json({ msg: '요청이 취소되었습니다.' });
    } catch (error: any) {
      res.status(400).json({ msg: error.message });
      next(error);
    }
  };
}

export default new IlchonsControllers();
