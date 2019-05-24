import {
  QueryToConversationResolver,
  MutationToCreateConversationResolver,
  SubscriptionToChatMessageResolver,
  MutationToSendMessageResolver,
  QueryToConversationsResolver,
} from '../typings/generated-graphql-schema-types';
import Conversation from '../models/conversation';
import to from 'await-to-js';
import { PubSub, withFilter } from 'graphql-subscriptions';

export const pubsub = new PubSub();

const conversation: QueryToConversationResolver = async (root, args) => {
  return Conversation.findOne({});
};

const conversations: QueryToConversationsResolver = async (
  root,
  args,
  { user },
) => {
  if (!user) return null;
  const [err, conversations] = await to(
    Conversation.find()
      .or([{ from: user.username }, { to: user.username }])
      .exec(),
  );

  if (err) {
    return null;
  }

  return conversations;
};

const createConversation: MutationToCreateConversationResolver = async (
  root,
  { username },
  { user },
) => {
  if (!user) return null;

  const newConversation = new Conversation({
    from: user.username,
    to: username,
    messages: [],
  });

  const [err, res] = await to(newConversation.save());

  if (err || !res) {
    return null;
  }

  return res;
};

const sendMessage: MutationToSendMessageResolver = async (
  root,
  args,
  { user },
) => {
  if (!user) return false;

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
  }

  conv.messages.push(newMessage);

  const updatedConv = new Conversation(conv);
  const [saveErr, res] = await to(updatedConv.save());

  if (saveErr || !res) {
    return false;
  }

  pubsub.publish('CHAT_MESSAGE', {
    chatMessage: newMessage,
    conversationId: args.input.conversationId,
  });
  return true;
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
  conversations,
  createConversation,
  subscribeToChatMessage,
  sendMessage,
};
