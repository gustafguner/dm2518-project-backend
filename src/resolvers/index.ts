import { Resolver } from '../typings/generated-graphql-schema-types';
import { user, createUser, login } from './user';
import {
  conversation,
  conversations,
  createConversation,
  createSymmetricKey,
  subscribeToMessage,
  sendMessage,
  subscribeToConversation,
} from './conversation';

const resolvers: Resolver = {
  Query: {
    user,
    conversation,
    conversations,
  },
  Mutation: {
    createUser,
    createConversation,
    createSymmetricKey,
    sendMessage,
    login,
  },
  Subscription: {
    message: subscribeToMessage,
    conversation: subscribeToConversation,
  },
};

export { resolvers };
