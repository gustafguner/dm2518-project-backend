import * as mongoose from 'mongoose';

import { IConversation } from './interfaces/conversation';

const Message = {
  body: { type: String, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  timestamp: { type: Date, default: Date.now },
};

export const ConversationSchema = new mongoose.Schema({
  from: { type: String, required: true },
  to: { type: String, required: true },
  messages: [Message],
});

const Conversation = mongoose.model<IConversation>(
  'Conversation',
  ConversationSchema,
);
export default Conversation;
