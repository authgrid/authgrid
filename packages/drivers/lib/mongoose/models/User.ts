import mongoose from 'mongoose';
import { Schema } from 'mongoose';
import { IUser } from '@authcom/common/interfaces/user.interfaces';

const UserSchema: Schema = new Schema(
  {
    email: String,
    password: { type: String },
  },
  {
    timestamps: true,
  },
);

export const User = mongoose.model<IUser>('User', UserSchema);
