import { CreateDiaryForm, UpdateDiaryForm } from '../../interfaces/diary';
import { Diaries, Comments } from '../models';

class DiaryRepository {
  findAllDiary = async (myhomeId: number) => {
    // 다양한 유저들이 존재해서 해당 유저가 작성한 게시글이 필요함
    return await Diaries.findAll({
      where: { myhomeId: myhomeId },
      include: [
        {
          model: Comments,
          // attributes: { exclude: ['password'] },
        },
      ],
      // order: [['diaryId', 'desc']],
    });
  };

  findOneDiary = async (diaryId: number) => {
    return await Diaries.findByPk(diaryId);
  };

  createDiary = async (createDiary: CreateDiaryForm) => {
    await Diaries.create(createDiary);
  };

  updateDiary = async ({ diaryId, dirImg, content }: UpdateDiaryForm) => {
    await Diaries.update({ content, dirImg }, { where: { diaryId } });
  };

  deleteDiary = async (diaryId: number) => {
    await Diaries.destroy({ where: { diaryId } });
  };
}

export default new DiaryRepository();
