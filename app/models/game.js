const mongoose = require("mongoose");

const gameSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    image: {
      type: String,
      required: true
    },
    categories: [
      {
        type: String
      }
    ],
    is_discounted: {
      type: Boolean,
      required: true,
      default: false
    },
    discount: Number,
    prices: [
      {
        game_id: String,
        date: String,
        price: String,
        currency: String,
        country: String,
        discount_price: String,
        discount_start_date: String,
        discount_end_date: String
      }
    ]
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Game", gameSchema);
