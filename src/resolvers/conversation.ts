import Conversation from '../models/conversation';
import {
  QueryToConversationResolver,
  MutationToCreateConversationResolver,
} from '../typings/generated-graphql-schema-types';

import to from 'await-to-js';

const conversation: QueryToConversationResolver = async (root, args) => {
  return Conversation.find({});
};

const createConversation: MutationToCreateConversationResolver = async (
  root,
  args,
) => {
  console.log(args);
  return true;
};

export { conversation, createConversation };
