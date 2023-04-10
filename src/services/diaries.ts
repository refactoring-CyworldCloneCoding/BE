import { Request, Response } from 'express';
import { Diaries, Myhomes } from '../db/repositories';
import { CreateDiaryForm, UpdateDiaryForm } from '../interfaces/diary';
import env from '../config.env';
import AppError from '../utils/appError';
import datetime from '../utils/datetime';
import { Comments } from '../db/entities';

class DiaryService {
  findAllDiary = async (myhomeId: number) => {
    const myhome = await Myhomes.findByMyhome(myhomeId);
    if (!myhome) throw new AppError('잘못된 요청입니다.', 400);
    const allDiary = await Diaries.findAllDiary(myhomeId);

    for (let i = 0; i < allDiary.length; i++) {
      allDiary[i].diaryNo = i + 1;
      allDiary[i].createdAt = datetime.createDatetime(allDiary[i].createdAt);
      allDiary[i].updatedAt = datetime.createDatetime(allDiary[i].updatedAt);
      if (allDiary[i].comments) {
        allDiary[i].comments.map((comment: Comments)=> {
          comment.createdAt = datetime.createDatetime(comment.createdAt);
          comment.updatedAt = datetime.createDatetime(comment.updatedAt);
        })
      }
    }

    // 호출한 Diary들 중 가장 최근 게시글순으로 정렬
    return allDiary.sort((a, b) => {
      return b.diaryNo - a.diaryNo;
    });
  };

  createDiary = async (req: Request, res: Response) => {
    const { myhomeId } = req.params;
    const { content } = req.body;
    const { user } = res.app.locals;

    const myhome = await Myhomes.findByMyhome(+myhomeId);

    if (!myhome) throw new AppError('잘못된 요청입니다.', 400);
    if (!content) throw new AppError('내용을 입력해주세요!', 400);
    if (user.userId !== myhome.userId)
      throw new AppError('작성 권한이 없습니다.', 403);
    const file = req.file as Express.MulterS3.File;

    const imageFileName = file ? file.key : null;
    const dirImg = imageFileName ? env.S3_STORAGE_URL + imageFileName : null;

    const createDiary: CreateDiaryForm = {
      myhomeId: +myhomeId,
      userId: user.userId,
      name: user.name,
      dirImg,
      content,
    };

    return await Diaries.createDiary(createDiary);
  };

  updateDiary = async (req: Request, res: Response) => {
    const { diaryId } = req.params;
    const { content } = req.body;
    const { user } = res.app.locals;

    const diary = await Diaries.findOneDiary(+diaryId);
    if (!diary) throw new AppError('잘못된 요청입니다.', 400);
    const file = req.file as Express.MulterS3.File;

    const imageFileName = file ? file.key : undefined;
    const dirImg = imageFileName
      ? env.S3_STORAGE_URL + imageFileName
      : undefined;
    // 본인 이외의 사람이 다이어리 수정시 예외처리
    if (user.userId !== diary.userId)
      throw new AppError('수정 권한이 없습니다.', 403);

    const updateDiary: UpdateDiaryForm = {
      diaryId: +diaryId,
      dirImg,
      content,
    };

    await Diaries.updateDiary(updateDiary);
  };

  deleteDiary = async (diaryId: number, userId: number) => {
    const diary = await Diaries.findOneDiary(diaryId);
    if (!diary) throw new AppError('잘못된 요청입니다.', 400);
    if (userId !== diary.userId)
      throw new AppError('삭제 권한이 없습니다.', 403);
    await Diaries.deleteDiary(diaryId);
  };
}

export default new DiaryService();
