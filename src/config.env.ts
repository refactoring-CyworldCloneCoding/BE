import path from 'path';
import dotenv from 'dotenv';
dotenv.config();

interface DBInterface {
  [key: string]: string;
}

class dBConnection {
  NODE_ENV: string;

  DB_NAME: string;
  DB_USER: string;
  DB_PASSWORD: string;
  DB_HOST: string;

  REDIS_URL: string;

  constructor() {
    this.NODE_ENV = process.env.NODE_ENV
      ? process.env.NODE_ENV.trim().toLowerCase()
      : 'development';

    const DB: DBInterface = {
      test: 'TEST',
      development: 'DEV',
      production: 'PRD',
    };

    this.DB_HOST = process.env[`${DB[this.NODE_ENV]}_HOST`]!;
    this.DB_NAME = process.env[`${DB[this.NODE_ENV]}_NAME`]!;
    this.DB_USER = process.env[`${DB[this.NODE_ENV]}_USER`]!;
    this.DB_PASSWORD = process.env[`${DB[this.NODE_ENV]}_PASSWORD`]!;

    const REDIS_HOST = process.env[`REDIS_${DB[this.NODE_ENV]}_HOST`]!;
    const REDIS_USER = process.env[`REDIS_${DB[this.NODE_ENV]}_USER`]!;
    const REDIS_PASSWORD = process.env[`REDIS_${DB[this.NODE_ENV]}_PASSWORD`]!;
    const REDIS_PORT = Number(process.env[`REDIS_${DB[this.NODE_ENV]}_PORT`]);

    this.REDIS_URL =
      this.NODE_ENV === 'production'
        ? `redis://${REDIS_HOST}:${REDIS_PORT}`
        : `redis://${REDIS_USER}:${REDIS_PASSWORD}@${REDIS_HOST}:${REDIS_PORT}/0`;
  }
}

class Env extends dBConnection {
  HTTP: string;

  HOST: string;
  ROOT_PATH: string;
  SRC_PATH: string;

  PORT: number;

  CA_FULL_CHAIN: string;
  KEY_PRIVKEY: string;
  CERT_CERT: string;

  AWS_ACCESS_KEY: string;
  AWS_ACCESS_SECREY_KEY: string;
  S3_STORAGE_URL: string;
  S3_REGION: string;

  KAKAO_ID: string;
  GOOGLE_ID: string;
  GOOGLE_SECRET: string;

  constructor() {
    super();

    this.HTTP = process.env.HTTP || 'http';

    this.PORT = Number(process.env.PORT);

    this.HOST =
      this.NODE_ENV === 'production'
        ? process.env.HOST || 'localhost'
        : 'localhost';

    this.ROOT_PATH = path.resolve('./');
    this.SRC_PATH = path.resolve(__dirname);

    this.CA_FULL_CHAIN = process.env.CA_FULL_CHAIN!;
    this.KEY_PRIVKEY = process.env.KEY_PRIVKEY!;
    this.CERT_CERT = process.env.CERT_CERT!;

    this.AWS_ACCESS_KEY = process.env.AWS_ACCESS_KEY!;
    this.AWS_ACCESS_SECREY_KEY = process.env.AWS_ACCESS_SECREY_KEY!;
    this.S3_STORAGE_URL = process.env.S3_STORAGE_URL!;
    this.S3_REGION = process.env.S3_REGION!;

    this.KAKAO_ID = process.env.KAKAO_ID!;
    this.GOOGLE_ID = process.env.GOOGLE_ID!;
    this.GOOGLE_SECRET = process.env.GOOGLE_SECRET!;
  }
}

export default new Env();
