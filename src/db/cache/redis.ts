import { createClient, RedisClientType, SetOptions } from 'redis';
import env from '../../config.env';

interface KeyPair {
  [key: string]: string | number;
}

class Redis {
  private readonly client: RedisClientType;

  constructor() {
    const { REDIS_URL } = env;
    this.client = createClient({ url: REDIS_URL });
    this.connect();

    this.client.on('connect', () => {
      //console.log('Redis connected');
    });

    this.client.on('error', (error) => {
      //console.log('Redis error, service degraded: ', error);
    });
  }

  private async connect() {
    await this.client.connect();
  }

  async set(key: string | number, value: string, option: SetOptions = {}) {
    await this.client.set(key.toString(), value, option);
  }

  async get(key: string | number) {
    if (!key) return null;
    return await this.client.get(key.toString());
  }

  async del(key: string | number) {
    if (!key) return null;
    await this.client.del(key.toString());
  }

  async hSet(key: string | number, data: KeyPair) {
    await this.client.hSet(key.toString(), data);
  }

  async hGet(key: string | number, field: string) {
    return await this.client.hGet(key.toString(), field);
  }

  async hGetAll(key: string | number) {
    return await this.client.hGetAll(key.toString());
  }

  async hDel(key: string | number, field: string) {
    await this.client.hDel(key.toString(), field);
  }

  async disconnect() {
    await this.client.disconnect();
  }

  getClient() {
    return this.client;
  }
}

export default new Redis();