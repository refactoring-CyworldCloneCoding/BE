import { Request, Response, NextFunction } from 'express';
import { Diaries, Users } from '../../services';
import env from '../../config.env';

class DiaryController {
  getDiary = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { myhomeId } = req.params;
      const diaries = await Diaries.findAllDiary(+myhomeId);

      res.status(200).json({ ok: true, data: diaries });
    } catch (error) {
      res.status(400).send({ ok: false });
      next(error);
    }
  };

  createDiary = async (req: Request, res: Response, next: NextFunction) => {
    const { myhomeId } = req.params;
    const { content } = req.body;
    const { name } = res.locals.user;
    const userInfo = res.locals.user;

    const identification = await Users.findByMyhome(+myhomeId);

    try {
      if (!content) {
        res.status(400).json({ message: '내용을 입력해주세요!' });
      }
      // 본인 이외의 사람이 다이어리 작성시 예외처리
      if (userInfo.userId !== identification?.userId) {
        throw new Error('작성 권한이 없습니다.');
      }
      // 파일이 있으면 key값으로 이름을 정하고 없으면 null
      // const imageFileName = req.file ? req.file.key : null;
      const imageFileName = 'test.jpg';
      // imageFileName에 파일명이 들어 갔으면 s3 url주소 추가
      // const dirImg = imageFileName
      //   ? env.S3_STORAGE_URL + imageFileName
      //   : null;
      const dirImg = env.S3_STORAGE_URL + imageFileName;

      await Diaries.createDiary({
        myhomeId: +myhomeId,
        name,
        dirImg,
        content,
        diaryNo: 0,
      });
      res.status(200).json({ ok: true });
    } catch (error) {
      res.status(400).send({ ok: false });
      next(error);
    }
  };

  updateDiary = async (req: Request, res: Response, next: NextFunction) => {
    const { diaryId, myhomeId } = req.params;
    const { content } = req.body;
    const userInfo = res.locals.user;

    const identification = await Users.findByMyhome(+myhomeId);

    // 수정사항에 이미지 파일이 있으면 key값으로 이름 정해주고 없으면 Null
    // const imageFileName = req.file ? req.file.key : null;
    const imageFileName = 'test.jpg';
    // imageFileName에 파일명이 들어 갔으면 s3 url주소 추가
    // const dirImg = imageFileName
    //   ? env.S3_STORAGE_URL + imageFileName
    //   : null;
    const dirImg = env.S3_STORAGE_URL + imageFileName;
    try {
      // 본인 이외의 사람이 다이어리 수정시 예외처리
      if (userInfo.userId !== identification?.userId) {
        throw new Error('수정 권한이 없습니다.');
      }

      await Diaries.updateDiary({
        diaryId: +diaryId,
        // userId,
        dirImg,
        content,
      });
      res.status(200).json({ ok: true });
    } catch (error) {
      res.status(400).send({ ok: false });
      next(error);
    }
  };

  deleteDiary = async (req: Request, res: Response, next: NextFunction) => {
    const { diaryId } = req.params;
    const { myhomeId } = req.params;
    const userInfo = res.locals.user;
    const identification = await Users.findByMyhome(+myhomeId);

    try {
      // 본인 이외의 사람이 다이어리 삭제시 예외처리
      if (userInfo.userId !== identification?.userId) {
        throw new Error('삭제 권한이 없습니다.');
      }
      await Diaries.deleteDiary(+diaryId, +myhomeId);
      res.status(200).json({ ok: true });
    } catch (error) {
      res.status(400).send({ ok: false });
      next(error);
    }
  };
}

export default new DiaryController();
