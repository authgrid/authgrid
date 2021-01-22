import { User } from './models/User';
import { IDriver } from '@authcom/common/interfaces/driver.interfaces';
import { IUser } from '@authcom/common/interfaces/user.interfaces';

export const Driver = (): IDriver => ({
  createUser: async ({ email, password }) => {
    const user = await new User({
      email,
      password,
    }).save();

    return user.toObject() as IUser;
  },
  findUserByEmail: async ({ email }) =>
    await User.findOne({
      email,
    }).lean(),
});
