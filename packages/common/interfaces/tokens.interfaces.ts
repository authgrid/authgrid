import { Document } from 'mongoose';
import { IUser } from './user.interfaces';

export interface IToken extends Document {
  token: string;
  user?: IUser | string;
  type: 'activation' | 'reset-password';
}
