import { Request, Response, NextFunction } from 'express';
import multer from 'multer';
import multerS3 from 'multer-s3';
import { s3, s3Del } from '../db/config/s3';
import env from '../config.env'
import { Diaries } from '../db/models';

class S3ImageController {
  upload = multer({
    storage: multerS3({
      s3: s3,
      bucket: env.S3_STORAGE_NAME,
      acl: 'public-read',
      contentType: multerS3.AUTO_CONTENT_TYPE,
      // shouldTransform: true,
      key: function (req, file, cb) {
        console.log(file);
        let ext = file.mimetype.split('/')[1];
        if (!['png', 'jpg', 'jpeg', 'gif'].includes(ext))
          return cb(new Error('이미지 파일이 아닙니다.'));

        cb(null, `${Date.now()}.${ext}`);
      },
    }),
    limits: { fileSize: 10 * 1024 * 1024 },
  });

  delete_file = async (req: Request, res: Response, next: NextFunction) => {
    const { diaryId } = req.params;
    const imgName = await Diaries.findOne({ where: { diaryId } });

    const s3ImgName = imgName!.dirImg.split('/').pop();

    let params = {
      Bucket: env.S3_STORAGE_NAME,
      Key: s3ImgName!,
    };

    try {
      s3Del.deleteObject(params, function (error: Error, data: any) {
        if (error) {
          console.log('err', error, error.stack);
        } else {
          console.log(data, '정말 삭제 되었습니다.');
        }
      });
      next();
    } catch (err) {
      console.log(err);
      throw err;
    }
  };
}

export default new S3ImageController();
