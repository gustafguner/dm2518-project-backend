import { Resolver } from '../typings/generated-graphql-schema-types';
import { user, createUser, login } from './user';
import {
  conversation,
  createConversation,
  subscribeToChatMessage,
  sendMessage,
} from './conversation';

const resolvers: Resolver = {
  Query: {
    user,
    conversation,
  },
  Mutation: {
    createUser,
    createConversation,
    sendMessage,
    login,
  },
  Subscription: {
    chatMessage: subscribeToChatMessage,
  },
};

export { resolvers };
