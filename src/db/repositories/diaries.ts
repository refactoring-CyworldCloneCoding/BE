import { CreateDiaryForm, UpdateDiaryForm } from '../../interfaces/diary';
import { Diaries } from '../entities';

class DiaryRepository {
  findAllDiary = async (myhomeId: number) => {
    // 다양한 유저들이 존재해서 해당 유저가 작성한 게시글이 필요함
    return await Diaries.find({
      where: { myhomeId },
      relations: { comments: true },
    });
  };

  findOneDiary = async (diaryId: number) => {
    return await Diaries.findOne({
      where: { diaryId },
      relations: { comments: true },
    });
  };

  createDiary = async (createDiary: CreateDiaryForm) => {
    const diaryInfo = Diaries.create(createDiary);
    await Diaries.save(diaryInfo);
  };

  updateDiary = async ({ diaryId, dirImg, content }: UpdateDiaryForm) => {
    const diaryInfo = await Diaries.findOne({ where: { diaryId } });
    if (dirImg) diaryInfo.dirImg = dirImg;
    if (content) diaryInfo.content = content;
    await Diaries.save(diaryInfo);
  };

  deleteDiary = async (diaryId: number) => {
    await Diaries.delete(diaryId);
  };
}

export default new DiaryRepository();
