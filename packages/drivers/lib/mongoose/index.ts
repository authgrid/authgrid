import { User } from './models/User';
import { IDriver } from '@authcom/common/interfaces/driver.interfaces';
import { IUser } from '@authcom/common/interfaces/user.interfaces';
import { ActivationToken } from './models/ActivationTokens';

export const Driver = (): IDriver => ({
  userActions: {
    createUser: async ({ email, password }) => {
      const user = await new User({
        email,
        password,
      }).save();

      return user.toObject() as IUser;
    },
    findUserById: ({ userId }) => User.findOne({ id: userId }).lean(),
    findUserByEmail: ({ email }) =>
      User.findOne({
        email,
      }).lean(),
    updateUserById: ({ userId, update }) =>
      User.findOneAndUpdate({ id: userId }, update, {
        new: true,
      }),
  },
  activationTokenActions: {
    createActivationToken: async ({ userId }) => {
      const activationToken = await new ActivationToken({
        userId,
      }).save();

      return activationToken.token;
    },
    validateActivationToken: async ({ token, userId }) => {
      const activationToken = await ActivationToken.findOne({
        token,
        userId,
      }).lean();

      return Boolean(activationToken);
    },
    deleteActivationToken: ({ token, userId }) =>
      ActivationToken.deleteOne({
        token,
        userId,
      }),
  },
});
