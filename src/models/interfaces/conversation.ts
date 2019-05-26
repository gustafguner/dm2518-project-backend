import * as mongoose from 'mongoose';
import { IUser } from './user';

export interface IMessage {
  body: string;
  author: string;
  timestamp?: Date;
}

export interface IConversation extends mongoose.Document {
  from: IUser;
  to: IUser;
  messages: [IMessage];
  fromKey?: string;
  toKey?: string;
  iv?: string;
}
