import { sendMessage, templates } from '../services/mailer';
import { ContextHolder } from './context.utils';

export const sendActivationEmail = async ({ email, id }) => {
  const driver = ContextHolder.getDriver();

  const token = await driver?.activationTokenActions.createActivationToken({
    userId: id,
  });

  try {
    await sendMessage({
      to: email,
      ...templates.activate({ token, userId: id }),
    });

    return true;
  } catch (err) {
    throw new Error(err);
  }
};
