import Conversation from '../models/conversation';
import {
  QueryToConversationResolver,
  MutationToCreateConversationResolver,
  SubscriptionToChatMessageResolver,
  MutationToSendMessageResolver,
} from '../typings/generated-graphql-schema-types';

import { PubSub, withFilter } from 'graphql-subscriptions';

export const pubsub = new PubSub();

import to from 'await-to-js';

const conversation: QueryToConversationResolver = async (root, args) => {
  return Conversation.findOne({});
};

const createConversation: MutationToCreateConversationResolver = async (
  root,
  args,
  { user },
) => {
  console.log(`USer: ${user}`);
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

const sendMessage: MutationToSendMessageResolver = async (root, args) => {
  const [findErr, conv] = await to(
    Conversation.findById(args.input.conversationId).exec(),
  );
  const newMessage = {
    author: args.input.authorId,
    body: args.input.body,
    timestamp: new Date(),
  };
  if (findErr || !conv) {
    return false;
  } else {
    conv.messages.push(newMessage);
  }
  const updatedConv = new Conversation(conv);
  const [saveErr, res] = await to(updatedConv.save());
  if (saveErr || !res) {
    return false;
  } else {
    pubsub.publish('CHAT_MESSAGE', {
      chatMessage: newMessage,
      conversationId: args.input.conversationId,
    });
    return true;
  }
};

const subscribeToChatMessage: SubscriptionToChatMessageResolver = {
  subscribe: withFilter(
    () => pubsub.asyncIterator('CHAT_MESSAGE'),
    (payload, { conversationId }) => {
      return payload.conversationId == conversationId;
    },
  ),
};

export {
  conversation,
  createConversation,
  subscribeToChatMessage,
  sendMessage,
};
