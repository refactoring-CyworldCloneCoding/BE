import { Diaries } from '../db/repositories';
import { CreateDiaryForm, UpdateDiaryForm } from '../interfaces/diary';

class DiaryService {
  findAllDiary = async (myhomeId: number) => {
    // 저장소에서 데이터요청
    const allDiary = await Diaries.findAllDiary(myhomeId);

    for (let i = 0; i < allDiary.length; i++) {
      allDiary[i].dataValues.diaryNo = i + 1;
    }

    // 호출한 Diary들 중 가장 최근 게시글순으로 정렬
    return allDiary.sort((a, b) => {
      return b.dataValues.diaryNo - a.dataValues.diaryNo;
    });
  };

  createDiary = async (createDiary: CreateDiaryForm) => {
    return await Diaries.createDiary(createDiary);
  };

  updateDiary = async ({ diaryId, dirImg, content }: UpdateDiaryForm) => {
    await Diaries.updateDiary({ diaryId, dirImg, content });
  };

  deleteDiary = async (diaryId: number, myhomeId: number) => {
    const deleteDiaryData = await Diaries.deleteDiary(diaryId);
    return deleteDiaryData;
  };
}

export default new DiaryService();
