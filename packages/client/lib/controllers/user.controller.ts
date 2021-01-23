export const getUser = (req, res) => {
  res.formatter.ok(req.user);
};
