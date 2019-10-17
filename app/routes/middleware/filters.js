module.exports = (req, res, next) => {
  let filters = {};

  if (req.query.filters) {
    for (const key of Object.keys(req.query.filters)) {
      if (
        req.query.filters[key] === "true" ||
        req.query.filters[key] === "false" ||
        req.query.filters[key] == parseInt(req.query.filters[key], 10)
      ) {
        filters[key] = req.query.filters[key];
      } else {
        filters[key] = new RegExp(req.query.filters[key], "i");
      }
    }
  }

  res.filters = filters;

  next();
};
