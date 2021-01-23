import { refreshTokens } from '../utils/token';
import { UnauthorizedError } from '../utils/errors';

const { TOKEN_SECRET, REFRESH_TOKEN_SECRET } = process.env;

export const refreshToken = async (req, res, next) => {
  try {
    return res.send(
      await refreshTokens(
        req.user,
        req.cookies['ac_refresh'],
        TOKEN_SECRET,
        REFRESH_TOKEN_SECRET
      )
    );
  } catch (err) {
    next(new UnauthorizedError());
  }
};

export const logout = (req, res) => {
  res.clearCookie('ac_refresh');
  res.sendStatus(200);
};
