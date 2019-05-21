import * as mongoose from 'mongoose';

import { IConversation } from './interfaces/conversation';

export const UserSchema = new mongoose.Schema({
  from: { type: String, required: true },
  to: { type: String, required: true },
  messages: [{ type: String, required: true }],
});

const User = mongoose.model<IConversation>('User', UserSchema);
export default User;
