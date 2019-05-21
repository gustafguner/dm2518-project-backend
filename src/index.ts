import * as express from 'express';
import * as cors from 'cors';
import * as bodyParser from 'body-parser';
const morgan = require('morgan');
import { ApolloServer, gql } from 'apollo-server-express';
import * as mongoose from 'mongoose';
import { execute, subscribe } from 'graphql';
import { SubscriptionServer } from 'subscriptions-transport-ws';
import { schema } from './schema';
import { createServer } from 'http';
import * as dotenv from 'dotenv';
dotenv.config();

import {
  encryptStringWithRsaPublicKey,
  decryptStringWithRsaPrivateKey,
  test,
} from './crypto';
import to from 'await-to-js';

const PORT = process.env.PORT || 4000;

mongoose
  .connect(process.env.MONGODB_URL!, {
    auth: {
      user: process.env.MONGODB_USERNAME!,
      password: process.env.MONGODB_PASSWORD!,
    },
  })
  .then(() => console.log('Successfully connected to MongoDB'))
  .catch((err) =>
    console.error(
      'An error occured when connecting to the MongoDB database: ',
      err,
    ),
  );

const app = express();

app.use(morgan('dev'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());

const server = new ApolloServer({
  schema,
  playground: {
    subscriptionEndpoint: '/subscriptions',
  },
});

server.applyMiddleware({ app });

const ws = createServer(app);

ws.listen(PORT, () => {
  console.log(`Server listenting on http://localhost:${PORT}`);
  new SubscriptionServer(
    {
      keepAlive: 10_000,
      execute,
      subscribe,
      schema,
    },
    {
      server: ws,
      path: '/subscriptions',
    },
  );
});

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
