import { Router } from 'express';
import { Diaries } from '../controllers';
import auth from '../../middlewares/auth';
import S3Upload from '../../middlewares/diaryUpload'

const router = Router();

router.get('/:myhomeId', Diaries.getDiary);
router.post(
  '/:myhomeId',
  auth.authMiddleware,
  S3Upload.upload.single('dirImg'),
  Diaries.createDiary
);
router.put(
  '/:diaryId',
  auth.authMiddleware,
  S3Upload.upload.single('dirImg'),
  Diaries.updateDiary
);
router.delete(
  '/:diaryId',
  auth.authMiddleware,
  S3Upload.delete_file,
  Diaries.deleteDiary
);

export default router;
