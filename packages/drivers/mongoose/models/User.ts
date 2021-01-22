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

UserSchema.set('toObject', {
  transform: function (doc, ret) {
    delete ret['password'];
    return ret;
  },
});

export const User = mongoose.model<IUser>('User', UserSchema);
