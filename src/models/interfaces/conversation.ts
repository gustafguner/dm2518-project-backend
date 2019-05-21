import * as mongoose from 'mongoose';
import { IUser } from './user';

export interface IMessage {
  body: string;
  author: string;
  timestamp?: Date;
}

export interface IConversation extends mongoose.Document {
  from: string;
  to: string;
  messages: [IMessage];
}
