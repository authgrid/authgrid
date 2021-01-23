import { IUser } from './user.interfaces';

export interface IDriver {
  userActions: {
    createUser: (params: { email: string; password: string }) => Promise<IUser>;
    findUserById: (params: { userId: string }) => Promise<IUser>;
    findUserByEmail: (params: { email: string }) => Promise<IUser>;
    updateUserById: (params: { userId: string; update: any }) => Promise<IUser>;
  };
  activationTokenActions: {
    createActivationToken: (params: { userId: string }) => Promise<string>;
    validateActivationToken: (params: {
      token: string;
      userId: string;
    }) => Promise<boolean>;
    deleteActivationToken: (params: {
      token: string;
      userId: string;
    }) => Promise<any>;
  };
}
