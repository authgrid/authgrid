import mongoose from 'mongoose';
import { Schema } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

import { IUser } from '@authcom/common/interfaces/user.interfaces';

const UserSchema: Schema = new Schema(
  {
    id: {
      type: String,
      default: uuidv4(),
      unique: true,
      index: true,
    },
    email: String,
    password: String,
    activated: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export const User = mongoose.model<IUser>('User', UserSchema);
