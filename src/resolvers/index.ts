import { Resolver } from '../typings/generated-graphql-schema-types';
import { user, createUser } from './user';
import { conversation, createConversation } from './conversation';

const resolvers: Resolver = {
  Query: { user, conversation },
  Mutation: { createUser, createConversation },
};

export { resolvers };
