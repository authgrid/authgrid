import jwt from 'jsonwebtoken';

const { TOKEN_SECRET } = process.env;

export const withAuthentication = () => async (req, res, next) => {
  const token = req.headers['authorization']?.replace('Bearer ', '');
  if (token) {
    try {
      const { user } = jwt.verify(token, TOKEN_SECRET);
      req.user = user;
      return next();
    } catch (err) {
      return res.formatter.unauthorized();
    }
  }

  res.formatter.unauthorized();
};
