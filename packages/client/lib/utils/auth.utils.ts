import { sendMessage, templates } from '../services/sendgrid';
import { DriverHolder } from './driver.utils';

export const sendActivationEmail = async ({ email, id }) => {
  const driver = DriverHolder.getDriver();

  const token = await driver?.activationTokenActions.createActivationToken({
    userId: id,
  });

  try {
    await sendMessage({
      from: 'nirberko@gmail.com',
      to: email,
      ...templates.activate({ token, userId: id }),
    });

    return true;
  } catch (err) {
    throw new Error(err);
  }
};
