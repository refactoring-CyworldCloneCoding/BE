import { Request, Response, NextFunction } from 'express';
import multer from 'multer';
import multerS3 from 'multer-s3';
import { s3 } from '../db/config/s3';
import env from '../config.env';
import { Diaries } from '../db/repositories';

class S3ImageController {
  upload = multer({
    storage: multerS3({
      s3: s3,
      bucket: env.S3_STORAGE_NAME,
      acl: 'public-read',
      contentType: multerS3.AUTO_CONTENT_TYPE,
      key: function (req, file, cb) {
        const ext = file.mimetype.split('/')[1];
        if (!['png', 'jpg', 'jpeg', 'gif'].includes(ext))
          return cb(new Error('이미지 파일이 아닙니다.'));
        cb(null, `/${Date.now()}.${ext}`);
      },
    }),
    limits: { fileSize: 10 * 1024 * 1024 },
  });

  delete_file = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { diaryId } = req.params;
      const imgName = await Diaries.findOneDiary(+diaryId);

      if (imgName?.dirImg) {
        const s3ImgName = imgName.dirImg!.split('/').pop();

        let params = {
          Bucket: env.S3_STORAGE_NAME,
          Key: s3ImgName!,
        };

        s3.deleteObject(params, function (error: any, data: any) {
          if (error) {
            console.log('err', error, error.stack);
          } else {
            console.log(data, '삭제 되었습니다.');
          }
        });
      }

      next();
    } catch (err) {
      console.log(err);
      throw err;
    }
  };
}

export default new S3ImageController();
