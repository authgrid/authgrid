import sgMail from '@sendgrid/mail';

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

export const sendMessage = async ({ to, from, subject, html }) =>
  await sgMail.send({
    to,
    from,
    subject,
    html,
  });
