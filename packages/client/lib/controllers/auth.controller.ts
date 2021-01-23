import { refreshTokens } from '../utils/token';

const { TOKEN_SECRET, REFRESH_TOKEN_SECRET } = process.env;

export const refreshToken = async (req, res) => {
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
    res.formatter.unauthorized();
  }
};

export const logout = (req, res) => {
  res.clearCookie('ac_refresh');
  res.formatter.ok();
};
