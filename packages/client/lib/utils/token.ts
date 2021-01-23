import _ from 'lodash';
import jwt from 'jsonwebtoken';
import { DriverHolder } from '../index';

const { TOKEN_EXPIRES, REFRESH_TOKEN_EXPIRES } = process.env;

export const createTokens = async (user, SECRET, REFRESH_SECRET) => {
  delete user.password;

  const createToken = jwt.sign({ user }, SECRET, {
    expiresIn: TOKEN_EXPIRES,
  });

  const createRefreshToken = jwt.sign(
    {
      user: _.pick(user, '_id'),
    },
    REFRESH_SECRET,
    {
      expiresIn: REFRESH_TOKEN_EXPIRES,
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
  const driver = DriverHolder.getDriver();

  let userId = null;

  try {
    const {
      user: { _id },
    } = jwt.decode(refreshToken);
    userId = _id;
  } catch (err) {
    throw err;
  }

  if (!userId) {
    throw new Error();
  }

  const user = await driver?.findUserById(userId);

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
  };
};
