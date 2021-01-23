import { refreshTokens } from '../utils/token';
import { IDriver } from '@authcom/common/interfaces/driver.interfaces';

const { TOKEN_SECRET, REFRESH_TOKEN_SECRET } = process.env;

export const refreshToken = async (req, res) => {
  try {
    return res.formatter.ok(
      await refreshTokens(
        req.user,
        req.cookies['ac_refresh'],
        TOKEN_SECRET,
        REFRESH_TOKEN_SECRET
      )
    );
  } catch (err) {
    res.formatter.unauthorized();
  }
};

export const logout = (req, res) => {
  res.clearCookie('ac_refresh');
  res.formatter.ok();
};

export const activateUser = async (req, res) => {
  const driver: IDriver = req.driver;

  const { token, userId } = req.body;

  try {
    const isValidationTokenValid = await driver.activationTokenActions.validateActivationToken(
      {
        token,
        userId,
      }
    );

    if (!isValidationTokenValid) {
      return res.formatter.badRequest('Activation code is invalid');
    }

    await driver.userActions.updateUserById({
      userId,
      update: {
        activated: true,
      },
    });

    await driver.activationTokenActions.deleteActivationToken({
      token,
      userId,
    });

    res.formatter.ok();
  } catch (err) {
    res.formatter.badRequest('Activation code is invalid');
  }
};
