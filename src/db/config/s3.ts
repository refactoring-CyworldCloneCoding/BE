import AWS from 'aws-sdk'
import env from '../../config.env';


export const s3 = new AWS.S3({
  accessKeyId: env.AWS_ACCESS_KEY,
  secretAccessKey: env.AWS_ACCESS_SECREY_KEY,
  region: env.S3_REGION,
});