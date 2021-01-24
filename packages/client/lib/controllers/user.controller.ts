export const getUser = (req, res, next) => {
  res.formatter.ok(req.user);
};
