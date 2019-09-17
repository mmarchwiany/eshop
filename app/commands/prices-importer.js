const program = require("commander");
const mongoose = require("mongoose");
const Game = require("../models/game");
const Price = require("../models/price");

const { getPrices } = require("nintendo-switch-eshop");

program.option("-m, --markets <markets>", "markets", "PL");
program.option("-p, --page <page>", "page", 1);
program.option("--page-size <pageSize>", "page size", 50);
program.option("-d, --debug", "debug");
program.option("-s, --silent", "silent");

program.parse(process.argv);

const offset = (program.page - 1) * program.pageSize;

mongoose
  .connect(process.env.APP_DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    const db = mongoose.connection;
    db.on("error", error => console.error(error));

    return Game.find()
      .skip(offset)
      .limit(parseInt(program.pageSize))
      .exec();
  })
  .then(async (games, err) => {
    const markets = program.markets.split(",");
    for (let index = 0; index < markets.length; index++) {
      const country = markets[index].toUpperCase();
      try {
        await updatePrices(games, country);
      } catch (err) {
        console.error(err);
      }
    }
  })
  .then(() => {
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
  return getPrices(country, gamesChunk.map(o => o["id"]))
    .then(async data => {
      for (let index = 0; index < data.prices.length; index++) {
        const price = data.prices[index];
        try {
          await updateGamePrices(price, country);
          await savePrice(price, country);
          if (program.debug) {
            console.info(
              `- game ${price.title_id} [${country}] price successfully imported`
            );
          }
        } catch (err) {
          console.error(err);
        }
      }
    })
    .catch(err => console.error(err));
}

function savePrice(price, country) {
  return Price.findOneAndUpdate(
    {
      currency:
        price.regular_price !== undefined ? price.regular_price.currency : "",
      country,
      game_id: "" + price.title_id,
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
  return Game.findOne({ id: price.title_id })
    .exec()
    .then((game, err) => {
      const priceIndex = game.prices.findIndex(
        price => price.country === country
      );

      if (priceIndex !== -1) {
        game.prices[priceIndex] = transformPriceData(price, country);
      } else {
        game.prices.push(transformPriceData(price, country));
      }
      return game.save();
    });
}

function transformPriceData(price, country) {
  return {
    game_id: "" + price.title_id,
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
