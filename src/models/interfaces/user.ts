import * as mongoose from 'mongoose';

export interface IUser extends mongoose.Document {
  publicKey: string;
}
