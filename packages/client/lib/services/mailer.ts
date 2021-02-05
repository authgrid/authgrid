import { ContextHolder } from '../utils/context.utils';

export const templates = {
  activate: ({ token, userId }) => ({
    subject: 'Activate Your Account',
    html: `http://localhost:3000/account/activate?userId=${userId}&token=${token}`,
  }),
  resetPassword: ({ token }) => ({
    subject: 'Reset your password',
    html: `http://localhost:3000/account/reset-password?token=${token}`,
  }),
};

export const sendMessage = async ({ to, subject, html }) =>
  ContextHolder.getContext().mailer({ to, subject, html });
