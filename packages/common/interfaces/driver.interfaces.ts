import { IUser } from './user.interfaces';

export interface IDriver {
  createUser: (params: { email: string; password: string }) => Promise<IUser>;
  findUserByEmail: (params: { email: string }) => Promise<IUser>;
}
