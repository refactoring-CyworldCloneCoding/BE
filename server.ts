import fs from 'fs';
import HTTPS from 'https';
import app from './src/app';
import env from './src/config.env';
import { typeORMConfig } from './src/db/config/connection';

const port = env.PORT;

if (env.NODE_ENV === 'production') {
  try {
    const option = {
      ca: fs.readFileSync(env.CA_FULL_CHAIN),
      key: fs.readFileSync(env.KEY_PRIVKEY),
      cert: fs.readFileSync(env.CERT_CERT),
    };

    HTTPS.createServer(option, app).listen(port, () => {
      dbConnect();
      console.log('HTTPS 서버가 실행되었습니다. 포트 :: ' + port);
    });
  } catch (error) {
    console.log('HTTPS 서버가 실행되지 않습니다.');
    console.log(error);
  }
} else {
  app.listen(port, () => {
    dbConnect();
    console.log('HTTP 서버가 실행되었습니다. 포트 :: ' + port);
  });
}

function dbConnect() {
  if (env.NODE_ENV !== 'test') {
    typeORMConfig
      .initialize()
      .then(() => {
        console.log('Data Source has been initialized successfully.');
      })
      .catch((error) => {
        console.error(error);
        console.log('Error during Data Source initialization: ', error.message);

        process.exit(0);
      });
  }
}
