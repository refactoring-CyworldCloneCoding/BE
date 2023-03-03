import { Request, Response } from 'express';
import { Diaries, Myhomes } from '../db/repositories';
import { CreateDiaryForm, UpdateDiaryForm } from '../interfaces/diary';
import env from '../config.env';

class DiaryService {
  findAllDiary = async (myhomeId: number) => {
    const myhome = await Myhomes.findByMyhome(myhomeId);
    if (!myhome) throw new Error('잘못된 요청입니다.');
    const allDiary = await Diaries.findAllDiary(myhomeId);

    for (let i = 0; i < allDiary.length; i++) {
      allDiary[i].dataValues.diaryNo = i + 1;
    }

    // 호출한 Diary들 중 가장 최근 게시글순으로 정렬
    return allDiary.sort((a, b) => {
      return b.dataValues.diaryNo - a.dataValues.diaryNo;
    });
  };

  createDiary = async (req: Request, res: Response) => {
    const { myhomeId } = req.params;
    const { content } = req.body;
    const { user } = res.app.locals;

    const myhome = await Myhomes.findByMyhome(+myhomeId);

    if (!myhome) throw new Error('잘못된 요청입니다.');
    if (!content) throw new Error('내용을 입력해주세요!');
    if (user.userId !== myhome.userId) throw new Error('작성 권한이 없습니다.');

    const file = req.file as Express.MulterS3.File;

    const imageFileName = file ? file.key : undefined;
    const dirImg = imageFileName
      ? env.S3_STORAGE_URL + imageFileName
      : undefined;

    const createDiary: CreateDiaryForm = {
      myhomeId: +myhomeId,
      userId: user.userId,
      name: user.name,
      dirImg,
      content,
      diaryNo: 0,
    };

    return await Diaries.createDiary(createDiary);
  };

  updateDiary = async (req: Request, res: Response) => {
    const { diaryId, myhomeId } = req.params;
    const { content } = req.body;
    const { user } = res.app.locals;

    const myhome = await Myhomes.findByMyhome(+myhomeId);
    if (!myhome) throw new Error('잘못된 요청입니다.');

    const file = req.file as Express.MulterS3.File;

    const imageFileName = file ? file.key : undefined;
    const dirImg = imageFileName
      ? env.S3_STORAGE_URL + imageFileName
      : undefined;
    // 본인 이외의 사람이 다이어리 수정시 예외처리
    if (user.userId !== myhome.userId) throw new Error('수정 권한이 없습니다.');

    const updateDiary: UpdateDiaryForm = {
      diaryId: +diaryId,
      dirImg,
      content,
    };

    await Diaries.updateDiary(updateDiary);
  };

  deleteDiary = async (diaryId: number) => {
    const diary = await Diaries.findOneDiary(diaryId);
    if (!diary) throw new Error('잘못된 요청입니다.');
    await Diaries.deleteDiary(diaryId);
  };
}

export default new DiaryService();
