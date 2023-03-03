import { S3 } from 'aws-sdk';
// import { S3Client } from '@aws-sdk/client-s3';
import env from '../../config.env';

// export const s3 = new S3Client({
//   credentials: {
//     accessKeyId: env.AWS_ACCESS_KEY,
//     secretAccessKey: env.AWS_ACCESS_SECRET_KEY,
//   },
//   region: env.S3_REGION,
// });

export const s3 = new S3({
  apiVersion: '2006-03-01',
  credentials: {
    accessKeyId: env.AWS_ACCESS_KEY,
    secretAccessKey: env.AWS_ACCESS_SECRET_KEY,
  },
  region: env.S3_REGION,
});