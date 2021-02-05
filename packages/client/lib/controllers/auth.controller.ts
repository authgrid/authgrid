import { refreshTokens } from '../utils/token';
import { IDriver } from '@authgrid/common/interfaces/driver.interfaces';
import { sendMessage, templates } from '../services/mailer';
import { encryptPassword } from '../utils/password.utils';
import { ContextHolder } from '../utils/context.utils';

export const refreshToken = async (req, res, next) => {
  const { tokenSecret, refreshTokenSecret } = ContextHolder.getContext();

  try {
    if (req.cookies['ac_refresh']) {
      return res.formatter.ok(
        await refreshTokens(
          req.user,
          req.cookies['ac_refresh'],
          tokenSecret,
          refreshTokenSecret
        )
      );
    }
    res.formatter.unauthorized();
  } catch (err) {
    next(err);
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

export const requestResetPassword = async (req, res, next) => {
  const driver: IDriver = req.driver;

  const { email } = req.body;

  try {
    const user = await driver.userActions.findUserByEmail({ email });

    if (user) {
      const token = await driver.resetPasswordActions.createResetPasswordToken({
        userId: user.id,
      });

      await sendMessage({
        to: email,
        ...templates.resetPassword({ token }),
      });
    }

    res.formatter.ok();
  } catch (err) {
    res.formatter.badRequest();
    next(err);
  }
};

export const resetPassword = async (req, res) => {
  const { token } = req.query;

  try {
    const tokenModel = await req.driver.resetPasswordActions.getResetPasswordToken(
      { token }
    );

    if (tokenModel) {
      const password = await encryptPassword(req.body.password);
      await req.driver.userActions.updateUserById({
        userId: tokenModel.userId,
        update: { password },
      });

      await req.driver.resetPasswordActions.deleteResetPasswordToken({ token });

      return res.formatter.ok();
    }

    res.formatter.badRequest();
  } catch (err) {
    res.formatter.badRequest();
  }
};
