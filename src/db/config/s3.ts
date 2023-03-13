import { S3 } from 'aws-sdk';
import AWS from 'aws-sdk';
import env from '../../config.env';

const credentials = new AWS.Credentials(
  env.AWS_ACCESS_KEY,
  env.AWS_ACCESS_SECRET_KEY
);
AWS.config.credentials = credentials;

export const s3 = new S3({
  apiVersion: '2006-03-01',
  credentials: {
    accessKeyId: env.AWS_ACCESS_KEY,
    secretAccessKey: env.AWS_ACCESS_SECRET_KEY,
  },
  region: env.S3_REGION,
});
