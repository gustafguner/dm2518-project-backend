import User from '../models/user';
import {
  QueryToUserResolver,
  MutationToCreateUserResolver,
} from '../typings/generated-graphql-schema-types';

import to from 'await-to-js';

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
  const newUser = new User({
    username: args.input.username,
    publicKey: args.input.publicKey,
  });
  const [err, user] = await to(newUser.save());
  if (err || !user) {
    return false;
  }
  return user;
};

export { user, createUser };
