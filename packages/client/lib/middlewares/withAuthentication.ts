import jwt from 'jsonwebtoken';
import { UnauthorizedError } from '../utils/errors';

const { TOKEN_SECRET } = process.env;

export const withAuthentication = () => async (req, res, next) => {
  const token = req.headers['authorization']?.replace('Bearer ', '');
  if (token) {
    try {
      const { user } = jwt.verify(token, TOKEN_SECRET);
      req.user = user;
      next();
    } catch (err) {
      next(new UnauthorizedError());
    }
  }

  next(new UnauthorizedError());
};
