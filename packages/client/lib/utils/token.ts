import _ from 'lodash';
import jwt from 'jsonwebtoken';
import { ContextHolder } from './context.utils';

export const createTokens = async (user, SECRET, REFRESH_SECRET) => {
  delete user.password;
  const { tokenExpires, refreshTokenExpires } = ContextHolder.getContext();

  const createToken = jwt.sign({ user }, SECRET, {
    expiresIn: tokenExpires,
  });

  const createRefreshToken = jwt.sign(
    {
      user: _.pick(user, 'id'),
    },
    REFRESH_SECRET,
    {
      expiresIn: refreshTokenExpires,
    }
  );

  return Promise.all([createToken, createRefreshToken]);
};

export const refreshTokens = async (
  token,
  refreshToken,
  SECRET,
  REFRESH_SECRET
) => {
  const driver = ContextHolder.getDriver();
  const { tokenExpires } = ContextHolder.getContext();

  let userId = null;

  const {
    user: { id },
  } = jwt.decode(refreshToken);

  userId = id;

  if (!userId) {
    throw new Error();
  }

  const user = await driver?.userActions.findUserById({ userId });

  if (!user) {
    throw new Error();
  }

  const refreshSecret = REFRESH_SECRET + user?.password;

  try {
    jwt.verify(refreshToken, refreshSecret);
  } catch (err) {
    throw new Error();
  }

  const [newToken, newRefreshToken] = await createTokens(
    user,
    SECRET,
    refreshSecret
  );

  return {
    accessToken: newToken,
    refreshToken: newRefreshToken,
    expiresIn: tokenExpires,
  };
};
