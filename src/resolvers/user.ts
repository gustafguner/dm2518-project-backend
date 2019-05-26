import {
  QueryToUserResolver,
  MutationToCreateUserResolver,
  MutationToLoginResolver,
} from '../typings/generated-graphql-schema-types';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import to from 'await-to-js';
import User from '../models/user';

const user: QueryToUserResolver = async (root, { username }, { user }) => {
  if (!username) {
    if (!user) return null;
    return user;
  }

  const [err, foundUser] = await to(User.find({ username }).exec());

  if (err || !foundUser) {
    return null;
  }

  return user;
};

const createUser: MutationToCreateUserResolver = async (root, args) => {
  const [errFind, userFind] = await to(
    User.findOne({ username: args.input.username }).exec(),
  );

  if (errFind || userFind) return null;

  const hashedPassword = bcrypt.hashSync(args.input.password, 10);
  const newUser = new User({
    username: args.input.username,
    publicKey: args.input.publicKey,
    password: hashedPassword,
  });

  const [err, user] = await to(newUser.save());

  if (err || !user) {
    return null;
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET!, {
    expiresIn: 604800, // 1 week
  });

  return {
    user,
    token,
  };
};

const login: MutationToLoginResolver = async (root, args) => {
  const [err, user] = await to(
    User.findOne({ username: args.input.username }).exec(),
  );

  if (err || !user) {
    return false;
  }

  if (bcrypt.compareSync(args.input.password, user.password)) {
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET!, {
      expiresIn: 604800, // 1 week
    });

    return {
      user,
      token,
    };
  } else {
    return null;
  }
};

export { user, createUser, login };
