import jwt from 'jsonwebtoken';
import { ContextHolder } from '../utils/context.utils';

export const withAuthentication = () => async (req, res, next) => {
  const { tokenSecret } = ContextHolder.getContext();

  const token = req.headers['authorization']?.replace('Bearer ', '');
  if (token) {
    try {
      const { user } = jwt.verify(token, tokenSecret);
      req.user = user;
      return next();
    } catch (err) {
      return res.sendStatus(401);
    }
  }

  return res.sendStatus(401);
};
