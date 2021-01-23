import { Document } from 'mongoose';
import { IUser } from './user.interfaces';

export interface IActivationToken extends Document {
  token: string;
  user?: IUser | string;
}
