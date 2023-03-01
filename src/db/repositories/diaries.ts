import { CreateDiaryForm, UpdateDiaryForm } from '../../interfaces/diary';
import { Diaries } from '../models';

class DiaryRepository {
  findAllDiary = async (myhomeId: number) => {
    // 다양한 유저들이 존재해서 해당 유저가 작성한 게시글이 필요함
    return await Diaries.findAll({ where: { myhomeId } });
  };

  createDiary = async (createDiary: CreateDiaryForm) => {
    await Diaries.create(createDiary);
  };

  updateDiary = async ({ diaryId, dirImg, content }: UpdateDiaryForm) => {
    await Diaries.update({ content, dirImg }, { where: { diaryId } });

    return await Diaries.findOne({ where: { diaryId } });
  };

  deleteDiary = async (diaryId: number) => {
    // const deleteDiaryImg = await Diaries.findOne({ where: { diaryId } });

    const deleteDiaryData = await Diaries.destroy({ where: { diaryId } });
    return deleteDiaryData;
  };
}

export default new DiaryRepository();
