import { Router } from 'express';
import { Diaries } from '../controllers';
import auth from '../../middlewares/auth';
import S3Upload from '../../middlewares/diaryUpload'

const router = Router();

router.get('/:userId', Diaries.getDiary);
router.post(
  '/:userId',
  auth.authMiddleware,
  S3Upload.upload.single('dirImg'),
  Diaries.createDiary
);
router.put(
  '/:diaryId/:userId',
  auth.authMiddleware,
  S3Upload.upload.single('dirImg'),
  Diaries.updateDiary
);
router.delete(
  '/:diaryId/:userId',
  auth.authMiddleware,
  S3Upload.delete_file,
  Diaries.deleteDiary
);

export default router;
