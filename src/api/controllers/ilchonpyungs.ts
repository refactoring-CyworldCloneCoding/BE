import { Request, Response, NextFunction } from 'express';
import { Ilchonpyungs } from '../../services';

class IlchonpyungsController {
  // 일촌평 작성
  createBest = async (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log(req.body);
      await Ilchonpyungs.createBest(req, res);
      res.status(200).send({ msg: '일촌평이 작성되었습니다.' });
    } catch (error) {
      res.status(400).send({ ok: false });
    }
  };

  // 일촌평 목록 조회
  getBests = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await Ilchonpyungs.getBests(req, res);
      res.status(200).json({ data: result });
    } catch (error) {
      res.status(400).send({ ok: false });
    }
  };

  // 일촌평 삭제
  deleteBest = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await Ilchonpyungs.deleteBest(req, res);
      res.status(200).send({ msg: '일촌평이 삭제되었습니다.' });
    } catch (error) {
      res.status(400).send({ ok: false });
    }
  };
}

export default new IlchonpyungsController();
