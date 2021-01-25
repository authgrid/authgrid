import { User } from './models/User';
import { IDriver } from '@authgrid/common/interfaces/driver.interfaces';
import { IUser } from '@authgrid/common/interfaces/user.interfaces';
import { Token } from './models/Token';

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
      }).lean(),
  },
  activationTokenActions: {
    createActivationToken: async ({ userId }) => {
      const activationToken = await new Token({
        userId,
        type: 'activation',
      }).save();

      return activationToken.token;
    },
    validateActivationToken: async ({ token, userId }) => {
      const activationToken = await Token.findOne({
        token,
        userId,
      }).lean();

      return Boolean(activationToken);
    },
    deleteActivationToken: ({ token, userId }) =>
      Token.deleteOne({
        token,
        userId,
      }),
  },
  resetPasswordActions: {
    createResetPasswordToken: async ({ userId }) => {
      const activationToken = await new Token({
        userId,
        type: 'reset-password',
      }).save();

      return activationToken.token;
    },
    getResetPasswordToken: ({ token }) =>
      Token.findOne({
        token,
      }).lean(),
    deleteResetPasswordToken: ({ token }) =>
      Token.deleteOne({
        token,
      }),
  },
});
