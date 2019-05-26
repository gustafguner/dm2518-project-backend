import * as mongoose from 'mongoose';

import { IConversation } from './interfaces/conversation';

const Message = {
  body: { type: String, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  timestamp: { type: Date, default: Date.now },
};

export const ConversationSchema = new mongoose.Schema({
  from: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  to: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  messages: [Message],
  fromKey: { type: String, required: false },
  toKey: { type: String, required: false },
  iv: { type: String, required: false },
});

const Conversation = mongoose.model<IConversation>(
  'Conversation',
  ConversationSchema,
);
export default Conversation;
