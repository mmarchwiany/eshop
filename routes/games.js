const express = require("express");
const router = express.Router();
const Game = require("../models/game");

const {
  getGamesAmerica,
  getGamesEurope,
  getGamesJapan,
  getPrices
} = require("nintendo-switch-eshop");

router.get("/", async (req, res) => {
  try {
    const games = await Game.find();

    res.json(games);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/import-games", async (req, res) => {
  getGamesEurope()
    .then(async data => {
      for (let {
        nsuid_txt: id,
        title: title,
        image_url: image,
        game_categories_txt: categories,
        price_has_discount_b: is_discounted,
        price_discount_percentage_f: discount
      } of data) {
        if (id === undefined) {
          continue;
        }

        const game = new Game({
          id: id[0],
          title,
          image,
          categories,
          is_discounted,
          discount
        });

        try {
          await game.save();
        } catch (err) {
          res.status(500).json({ error: err.message });
        }
      }

      res.status(200).json({ save: "OK" });
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: err.message });
    });
});

router.post("/import-prices", (req, res) => {
  Game.find().exec((err, games) => {
    for (i = 0, j = games.length; i < j; i += 40) {
      gamesChunk = games.slice(i, i + 40);
      updatePrices(gamesChunk, res);
    }

    res.status(200).json({ save: "OK" });
  });
});

updatePrices = (gamesChunk, res) => {
  getPrices("PL", gamesChunk.map(o => o["id"]))
    .then(data => {
      data.prices.forEach(price => {
        Game.findOne({ id: price.title_id.toString() }, function(error, game) {
          game.prices.push(transformPriceData(price));
          game.save();
        });
      });
    })

    .catch(err => console.error(err));
};

transformPriceData = price => {
  return {
    date: new Date().toLocaleDateString(),
    price:
      price.regular_price !== undefined ? price.regular_price.raw_value : "",
    currency:
      price.regular_price !== undefined ? price.regular_price.currency : "",
    country: "PL",
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
