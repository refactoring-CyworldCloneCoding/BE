interface CreateDiaryForm {
  myhomeId: number;
  userId: number;
  name: string;
  dirImg: string | null | undefined;
  content: string;
  diaryNo: number;
}

interface UpdateDiaryForm {
  diaryId: number;
  dirImg: string | null | undefined;
  content: string;
}

export { CreateDiaryForm, UpdateDiaryForm };