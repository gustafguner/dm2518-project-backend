import {
  QueryToConversationResolver,
  MutationToCreateConversationResolver,
  MutationToSendMessageResolver,
  QueryToConversationsResolver,
  SubscriptionToConversationResolver,
  SubscriptionToMessageResolver,
  MutationToCreateSymmetricKeyResolver,
} from '../typings/generated-graphql-schema-types';
import Conversation from '../models/conversation';
import to from 'await-to-js';
import { PubSub, withFilter } from 'graphql-subscriptions';
import User from '../models/user';

export const pubsub = new PubSub();

const conversation: QueryToConversationResolver = async (
  root,
  { conversationId },
  { user },
) => {
  const [err, conversation] = await to(
    Conversation.findOne({ _id: conversationId })
      .or([{ from: user._id }, { to: user._id }])
      .populate('from')
      .populate('to')
      .populate('messages.author')
      .exec(),
  );

  if (err || !conversation) {
    return null;
  }

  return conversation;
};

const conversations: QueryToConversationsResolver = async (
  root,
  args,
  { user },
) => {
  if (!user) return null;

  const [err, conversations] = await to(
    Conversation.find()
      .or([{ from: user._id }, { to: user._id }])
      .populate('from')
      .populate('to')
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

  const [findErr, toUser] = await to(User.findOne({ username }).exec());

  if (findErr || !toUser) return null;

  const newConversation = new Conversation({
    from: user._id,
    to: toUser._id,
    messages: [],
  });

  const [err, res] = await to(newConversation.save());

  if (err || !res) {
    return null;
  }

  await Conversation.populate(res, { path: 'from' });
  await Conversation.populate(res, { path: 'to' });

  pubsub.publish('CONVERSATION', {
    conversation: res,
  });

  return res;
};

const createSymmetricKey: MutationToCreateSymmetricKeyResolver = async (
  root,
  { input },
  { user },
) => {
  if (!user) return false;

  const [findErr, conversation] = await to(
    Conversation.findById(input.conversationId).exec(),
  );

  if (findErr || !conversation) {
    return false;
  }

  conversation.fromKey = input.fromKey;
  conversation.toKey = input.toKey;
  conversation.iv = input.iv;

  const [saveErr] = await to(conversation.save());

  if (saveErr) {
    return false;
  }

  return true;
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

  if (findErr || !conv) {
    return false;
  }

  const newMessage = {
    author: user._id,
    body: args.input.body,
    timestamp: new Date(),
  };

  conv.messages.push(newMessage);

  const updatedConv = new Conversation(conv);
  const [saveErr, res] = await to(updatedConv.save());

  if (saveErr || !res) {
    return false;
  }

  await Conversation.populate(updatedConv, { path: 'messages.author' });

  pubsub.publish('MESSAGE', {
    message: updatedConv.messages[updatedConv.messages.length - 1],
    conversationId: args.input.conversationId,
  });

  return true;
};

const subscribeToMessage: SubscriptionToMessageResolver = {
  subscribe: withFilter(
    () => pubsub.asyncIterator('MESSAGE'),
    (payload, { conversationId }) => {
      return payload.conversationId == conversationId;
    },
  ),
};

const subscribeToConversation: SubscriptionToConversationResolver = {
  subscribe: withFilter(
    () => pubsub.asyncIterator('CONVERSATION'),
    (payload, args, { user }) => {
      return (
        payload.conversation.from._id.equals(user._id) ||
        payload.conversation.to._id.equals(user._id)
      );
    },
  ),
};

export {
  conversation,
  conversations,
  createConversation,
  createSymmetricKey,
  subscribeToMessage,
  subscribeToConversation,
  sendMessage,
};
