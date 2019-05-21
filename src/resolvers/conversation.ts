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
  const newConv = new Conversation({
    from: args.input.from,
    to: args.input.to,
    messages: [],
  });
  const [saveErr, res] = await to(newConv.save());
  if (saveErr || !res) {
    return false;
  } else {
    return res;
  }
};

export { conversation, createConversation };
