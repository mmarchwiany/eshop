module.exports = (req, res, next) => {
  const { page: page = 0, page_size = 10 } = req.query;
  const skip = page * page_size;

  if (page < 0) {
    return res.status(401).json({ message: "Page has to be grater the 0" });
  }
  if (page_size < 1) {
    return res
      .status(401)
      .json({ message: "Page size has to be grater the 0" });
  }

  res.page_size = parseInt(page_size);
  res.page = parseInt(page);
  res.skip = skip;

  next();
};
