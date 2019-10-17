module.exports = (req, res, next) => {
  const { order: order = null } = req.query;

  res.order = order;

  next();
};
