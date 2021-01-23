import sgMail from '@sendgrid/mail';

sgMail.setApiKey(String(process.env.SENDGRID_API_KEY));

export const templates = {
  activate: ({ token, userId }) => ({
    subject: 'Activate Your Account',
    html: `http://localhost:3000/account/activate?userId=${userId}&token=${token}`,
  }),
};

export const sendMessage = async ({ to, from, subject, html }) =>
  await sgMail.send({
    to,
    from,
    subject,
    html,
  });
