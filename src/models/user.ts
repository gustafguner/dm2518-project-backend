import * as mongoose from 'mongoose';

import { IUser } from './interfaces/user';

export const UserSchema = new mongoose.Schema({
  publicKey: { type: String, required: true },
});

const User = mongoose.model<IUser>('User', UserSchema);
export default User;
