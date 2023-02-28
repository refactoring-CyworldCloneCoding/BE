import fs from 'fs';
import HTTPS from 'https';
import { app } from './src/app';
import env from './src/config.env';

const port = env.PORT;

if (process.env.NODE_ENV == 'production') {
  try {
    const option = {
      ca: fs.readFileSync(env.CA_FULL_CHAIN),
      key: fs.readFileSync(env.KEY_PRIVKEY),
      cert: fs.readFileSync(env.CERT_CERT),
    };

    HTTPS.createServer(option, app).listen(port, () => {
      console.log('HTTPS 서버가 실행되었습니다. 포트 :: ' + port);
    });
  } catch (error) {
    console.log('HTTPS 서버가 실행되지 않습니다.');
    console.log(error);
  }
} else {
  app.listen(port, () => {
    console.log('HTTP 서버가 실행되었습니다. 포트 :: ' + port);
  });
}
