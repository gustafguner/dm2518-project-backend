import * as express from 'express';
import * as cors from 'cors';
import {
  encryptStringWithRsaPublicKey,
  decryptStringWithRsaPrivateKey,
  test,
} from './crypto';
import to from 'await-to-js';

const port = process.env.PORT || 3000;
const app = express();

app.use(cors());

const dummy = async () => {
  const data = await test();
  return data;
};

const dummy2 = async () => {
  const [err, data] = await to(dummy());
  if (err) {
    return;
  }
  const enc = encryptStringWithRsaPublicKey('whaddup', data!.pubKey);
  console.log(enc.toString());
  console.log(decryptStringWithRsaPrivateKey(enc, data!.privKey));
};

dummy2();

app.get('/', (req, res) => {
  res.send('Hello world!!111fem');
});

app.get('/version', (req, res) => {
  res.send({ version: 2.2 });
});

app.listen(port, (err: any) => {
  if (err) {
    return console.log(err);
  }

  return console.log(`server is listening on ${port}`);
});
