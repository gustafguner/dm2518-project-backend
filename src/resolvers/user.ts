import User from '../models/user';
import {
  QueryToUserResolver,
  MutationToCreateUserResolver,
  MutationToLoginResolver,
} from '../typings/generated-graphql-schema-types';

import to from 'await-to-js';
import * as bcrypt from 'bcrypt';

const user: QueryToUserResolver = async (root, args) => {
  const [err, user] = await to(
    User.find({ username: args.input.username }).exec(),
  );
  if (err || !user) {
    return false;
  }
  return user;
};

const createUser: MutationToCreateUserResolver = async (root, args) => {
  const hashedPassword = bcrypt.hashSync(args.input.password, 10);
  const newUser = new User({
    username: args.input.username,
    publicKey: args.input.publicKey,
    password: hashedPassword,
  });
  const [errFind, userFind] = await to(
    User.findOne({ username: args.input.username }).exec(),
  );
  if (userFind) {
    return null;
  }
  const [err, user] = await to(newUser.save());
  if (err || !user) {
    return null;
  }
  return user;
};

const login: MutationToLoginResolver = async (root, args) => {
  const [err, user] = await to(
    User.findOne({ username: args.input.username }).exec(),
  );
  if (err || !user) {
    return false;
  }
  if (bcrypt.compareSync(args.input.password, user.password)) {
    return user;
  } else {
    return null;
  }
};

export { user, createUser, login };
