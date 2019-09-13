require("dotenv").config();

const program = require("commander");
const Game = require("../models/game");
const mongoose = require("mongoose");

const {
  getGamesAmerica,
  getGamesEurope,
  getGamesJapan,
  getPrices
} = require("nintendo-switch-eshop");

program.option("-m, --markets <markets>", "markets", ["PL,DE"]);
program.option("-l, --limit <limit>", "limit", 10);
program.option("-d, --debug", "debug");
program.option("-s, --silent", "silent");

program.parse(process.argv);

mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
const db = mongoose.connection;

db.on("error", error => console.error(error));

Game.find()
  .then((games, err) => {
    for (i = 0; i < program.limit; i += 40) {
      gamesChunk = games.slice(i, i + 40);
      program.markets
        .split(",")
        .forEach(country => updatePrices(gamesChunk, country.toUpperCase()));
    }
  })
  .then(amount => {
    if (!program.silent) {
      console.info("prices imported");
    }
    mongoose.connection.close();
  })
  .catch(err => {
    console.error(err);
    mongoose.connection.close();
  });

function updatePrices(gamesChunk, country) {
  getPrices(country, gamesChunk.map(o => o["id"]))
    .then(data => {
      data.prices.forEach(async price => {
        try {
          await updateGamePrices(price, country);
          await storePrice(price, country);
          if (program.debug) {
            console.info(
              `- game ${price.title_id} [${country}] price successfully imported`
            );
          }
        } catch (err) {
          console.error(err);
        }
      });
    })
    .catch(err => console.error(err));
}

function storePrice(price, country) {
  return Price.findOneAndUpdate(
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

function updateGamePrices(price, country) {
  return Game.findOne({ id: price.title_id }, (game, error) => {
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
