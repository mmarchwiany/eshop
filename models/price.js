const mongoose = require("mongoose");

const priceSchema = new mongoose.Schema({
  game_id: String,
  date: String,
  price: String,
  currency: String,
  country: String,
  discount_price: String,
  discount_start_date: String,
  discount_end_date: String
});

module.exports = mongoose.model("Price", priceSchema);
