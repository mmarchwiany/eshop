const express = require("express");
const router = express.Router();
const Price = require("../models/price");
const pagination = require("./middleware/pagination");

router.get("/", pagination, async (req, res) => {
  try {
    const prices = await Price.find()
      .skip(res.skip)
      .limit(res.page_size);

    res.json({ prices, meta: { page: res.page, page_size: res.page_size } });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
