import { Resolver } from '../typings/generated-graphql-schema-types';
import { user, createUser, login } from './user';
import {
  conversation,
  conversations,
  createConversation,
  subscribeToChatMessage,
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
    sendMessage,
    login,
  },
  Subscription: {
    chatMessage: subscribeToChatMessage,
    conversation: subscribeToConversation,
  },
};

export { resolvers };
