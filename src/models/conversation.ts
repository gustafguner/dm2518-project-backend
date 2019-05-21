import * as mongoose from 'mongoose';

import { IConversation } from './interfaces/conversation';

export const ConversationSchema = new mongoose.Schema({
  from: { type: String, required: true },
  to: { type: String, required: true },
  messages: [{ type: String, required: true }],
});

const Conversation = mongoose.model<IConversation>(
  'Conversation',
  ConversationSchema,
);
export default Conversation;
