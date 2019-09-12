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

router.post("/import", async (req, res) => {
  Game.find().exec((err, games) => {
    for (i = 0, j = games.length; i < j; i += 50) {
      gamesChunk = games.slice(i, i + 50);
      ["PL", "DE"].forEach(country => updatePrices(gamesChunk, country, res));
    }

    res.status(200).json({ save: "OK" });
  });
});

function updatePrices(gamesChunk, country, res) {
  getPrices(country, gamesChunk.map(o => o["id"]))
    .then(data => {
      data.prices.forEach(price => {
        updateGamePrices(price, country);
        storePrice(price, country);
      });
    })
    .catch(err => console.error(err));
}

async function storePrice(price, country) {
  await Price.findOneAndUpdate(
    {
      currency: price.regular_price.currency,
      country,
      game_id: price.title_id,
      date: new Date().toLocaleDateString()
    },
    transformPriceData(price, country),
    {
      upsert: true,
      new: true,
      setDefaultsOnInsert: true,
      useFindAndModify: false
    }
  );
}

async function updateGamePrices(price, country) {
  await Game.findOne({ id: price.title_id }, (error, game) => {
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
}

function transformPriceData(price, country) {
  return {
    game_id: price.title_id,
    date: new Date().toLocaleDateString(),
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
}

module.exports = router;
