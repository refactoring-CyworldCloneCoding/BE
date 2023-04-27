import { DataSource, createConnection, getConnection } from 'typeorm';
import env from '../../src/config.env';
import * as entities from '../../src/db/entities';

const mockConnection = {
    async create() {
        return await createConnection({
          name: 'test',
          type: 'mysql',
          host: env.DB_HOST,
          port: 3306,
          username: env.DB_USER,
          password: env.DB_PASSWORD,
          database: env.DB_NAME,
          entities,
          synchronize: env.DB_SYNCHRONIZE,
          dropSchema: env.DB_DROPSCHEMA,
          timezone: 'Z',
        });
    },

    get() {
        return getConnection('test');
    },

    async close() {
        await getConnection('test').close();
    },

    async clear() {
        const connection = getConnection('test');
        const entities = connection.entityMetadatas;

        await Promise.all(
            entities.map(async (entity) => {
                const repository = connection.getRepository(entity.name);
                await repository.query(`DELETE FROM ${entity.tableName}`);
            })
        );
    },
};

export default mockConnection;
