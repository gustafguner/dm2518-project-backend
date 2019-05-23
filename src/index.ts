import * as dotenv from 'dotenv';
dotenv.config();

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
import * as jwt from 'jsonwebtoken';
import * as passport from 'passport';
import { jwtStrategy } from './passport';

import {
  encryptStringWithRsaPublicKey,
  decryptStringWithRsaPrivateKey,
  test,
} from './crypto';
import to from 'await-to-js';
import User from './models/user';

const PORT = process.env.PORT || 4000;
const JWT_SECRET = process.env.JWT_SECRET!;

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
app.use(passport.initialize());
app.use(passport.session());
passport.use(jwtStrategy);

const server = new ApolloServer({
  schema,
  context: async ({ req }) => {
    const authorization = req.headers.authorization;
    const token = authorization ? authorization.substring(7) : null;
    console.log(`Token: ${token}`);
    let decodedToken = null;

    try {
      decodedToken = jwt.verify(token, JWT_SECRET);
    } catch {}

    const u = decodedToken as any;

    const user =
      decodedToken !== null ? await User.findOne({ _id: u.id }) : null;

    return {
      user,
    };
  },
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
