const express = require("express");
const router = express.Router();
const Price = require("../models/price");
const Game = require("../models/game");

const { getPrices } = require("nintendo-switch-eshop");

router.post("/import", (req, res) => {
  Game.find().exec((err, games) => {
    for (i = 0, j = games.length; i < j; i += 50) {
      gamesChunk = games.slice(i, i + 50);
      ["PL", "DE", "UK"].forEach(country =>
        updatePrices(gamesChunk, country, res)
      );
    }

    res.status(200).json({ save: "OK" });
  });
});

updatePrices = (gamesChunk, country, res) => {
  getPrices(country, gamesChunk.map(o => o["id"]))
    .then(data => {
      data.prices.forEach(price => {
        Game.findOne({ id: price.title_id }, (error, game) => {
          const priceIndex = game.prices.findIndex(
            price => price.country === country
          );
          if (priceIndex !== -1) {
            game.prices[priceIndex] = transformPriceData(price, country);
          } else {
            game.prices.push(transformPriceData(price, country));
          }
          game.save();
        });
      });
    })
    .catch(err => console.error(err));
};

transformPriceData = (price, country) => {
  return {
    price:
      price.regular_price !== undefined ? price.regular_price.raw_value : "",
    currency:
      price.regular_price !== undefined ? price.regular_price.currency : "",
    country,
    discount_price:
      price.discount_price !== undefined ? price.discount_price.raw_value : "",
    discount_start_date:
      price.discount_price !== undefined
        ? price.discount_price.start_datetime
        : "",
    discount_end_date:
      price.discount_price !== undefined
        ? price.discount_price.end_datetime
        : ""
  };
};

module.exports = router;
