import Conversation from '../models/conversation';
import { IMessage } from '../models/interfaces/conversation';
import { MutationToSendMessageResolver } from '../typings/generated-graphql-schema-types';
import to from 'await-to-js';

const sendMessage: MutationToSendMessageResolver = async (root, args) => {
  const [findErr, conv] = await to(
    Conversation.findById(args.input.conversationId).exec(),
  );
  if (findErr || !conv) {
    return false;
  } else {
    conv.messages.push({
      author: args.input.authorId,
      body: args.input.body,
    });
  }
  const updatedConv = new Conversation(conv);
  const [saveErr, res] = await to(updatedConv.save());
  if (saveErr || !res) {
    return false;
  } else {
    return true;
  }
};

export { sendMessage };
