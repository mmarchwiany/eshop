const program = require("commander");
const Game = require("../models/game");
const mongoose = require("mongoose");

const {
  getGamesAmerica,
  getGamesEurope,
  getGamesJapan,
  getPrices
} = require("nintendo-switch-eshop");

program.option(
  "-m, --market <market>",
  "market [america, europe, japan]",
  "europe"
);
program.option("-d, --debug", "debug");
program.option("-s, --silent", "silent");

program.parse(process.argv);

mongoose.connect(process.env.APP_DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
const db = mongoose.connection;

db.on("error", error => console.error(error));

getGamesEurope()
  .then(async data => {
    for (let row of data) {
      if (row.nsuid_txt === undefined) {
        continue;
      }
      const game = {
        id: row.nsuid_txt[0],
        title: row.title,
        url: row.url,
        image: row.image_url,
        categories: row.game_categories_txt,
        is_discounted: row.price_has_discount_b,
        discount: row.price_discount_percentage_f
      };
      try {
        await Game.findOneAndUpdate(
          {
            id: game.id
          },
          game,
          {
            upsert: true,
            new: true,
            setDefaultsOnInsert: true,
            useFindAndModify: false
          }
        );
        if (program.debug) {
          console.info(`- ${row.title} successfully imported`);
        }
      } catch (err) {
        console.error(err);
      }
    }

    return data.length;
  })
  .then(amount => {
    if (!program.silent) {
      console.info(amount + " games imported");
    }
    mongoose.connection.close();
  })
  .catch(err => {
    console.error(err);
    mongoose.connection.close();
  });
