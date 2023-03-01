import fs from 'fs';
import HTTPS from 'https';
import App from './src/app';
import env from './src/config.env';
import sequelize from './src/db/config/connection';
import associate from './src/db/config/associate';

const port = env.PORT;

if (env.NODE_ENV == 'production') {
  try {
    const option = {
      ca: fs.readFileSync(env.CA_FULL_CHAIN),
      key: fs.readFileSync(env.KEY_PRIVKEY),
      cert: fs.readFileSync(env.CERT_CERT),
    };

    HTTPS.createServer(option, App.app).listen(port, () => {
      dbConnect();
      console.log('HTTPS 서버가 실행되었습니다. 포트 :: ' + port);
    });
  } catch (error) {
    console.log('HTTPS 서버가 실행되지 않습니다.');
    console.log(error);
  }
} else {
  App.app.listen(port, () => {
    dbConnect();
    console.log('HTTP 서버가 실행되었습니다. 포트 :: ' + port);
  });
}

function dbConnect(){
  if (env.NODE_ENV !== 'test') {
    sequelize
      .authenticate()
      .then(() => {
        associate();
        console.log('DB CONNECTED');
      })
      .catch((error) => {
        console.error(error);
        console.log('DB CONNECTION FAIL');

        process.exit(0);
      });
  }
}
