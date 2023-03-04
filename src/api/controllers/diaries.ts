import { Request, Response, NextFunction } from 'express';
import { Diaries, Users } from '../../services';

class DiariesControllers {
  getDiary = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { myhomeId } = req.params;
      const diaries = await Diaries.findAllDiary(+myhomeId);
      res.status(200).json({ data: diaries });
    } catch (error: any) {
      res.status(400).json({ msg: error.message });
      next(error);
    }
  };

  createDiary = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await Diaries.createDiary(req, res);
      res.status(200).json({ msg: '작성되었습니다.' });
    } catch (error: any) {
      res.status(400).json({ msg: error.message });
      next(error);
    }
  };

  updateDiary = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await Diaries.updateDiary(req, res);
      res.status(200).json({ msg: '수정되었습니다.' });
    } catch (error: any) {
      res.status(400).json({ msg: error.message });
      next(error);
    }
  };

  deleteDiary = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { diaryId } = req.params;
      const { userId } = res.app.locals.user;
      await Diaries.deleteDiary(+diaryId, userId);
      res.status(200).json({ msg: '삭제되었습니다.' });
    } catch (error: any) {
      res.status(400).json({ msg: error.message });
      next(error);
    }
  };
}

export default new DiariesControllers();
