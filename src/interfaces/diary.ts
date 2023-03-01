interface CreateDiaryForm {
  myhomeId: number;
  name: string;
  dirImg: string;
  content: string;
  diaryNo: number;
}

interface UpdateDiaryForm {
  diaryId: number;
  dirImg: string;
  content: string;
}

export { CreateDiaryForm, UpdateDiaryForm };