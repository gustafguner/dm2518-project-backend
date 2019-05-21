import * as mongoose from 'mongoose';

export interface IConversation extends mongoose.Document {
  from: string;
  to: string;
  messages: [string];
}
