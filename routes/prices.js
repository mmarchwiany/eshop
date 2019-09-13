const express = require("express");
const router = express.Router();
const Price = require("../models/price");
const Game = require("../models/game");

const { getPrices } = require("nintendo-switch-eshop");

router.get("/", async (req, res) => {
  try {
    const prices = await Price.find();

    res.json(prices);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
