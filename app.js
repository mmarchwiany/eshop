const express = require("express");
const app = express();
const port = 3000;

var url = "mongodb://localhost:27017/eshop";
var db = require("mongodb").MongoClient;

app.get("/importGamesList", (req, res) => {
  const {
    getGamesAmerica,
    getGamesEurope,
    getGamesJapan,
    getPrices
  } = require("nintendo-switch-eshop");

  db.connect(url, function(err, db) {
    if (err) throw err;

    db.collection("games").insertOne(
      {
        id: 1,
        title: "title",
        image: "image",
        category: ["1", "2"],
        is_discounted: false,
        discount: 0
      },
      function(err, res) {
        if (err) throw err;
        console.log("Document inserted");
        db.close();
      }
    );

    db.close();
  });

  //   getGamesEurope().then(data => {
  //     for (let {
  //       nsuid_txt: id,
  //       title: title,
  //       image_url: image,
  //       game_categories_txt: category,
  //       price_has_discount_b: is_discounted,
  //       price_discount_percentage_f: discount
  //     } of data) {
  //       db.collection("games").insertOne(
  //         {
  //           id,
  //           title,
  //           image,
  //           category,
  //           is_discounted,
  //           discount
  //         },
  //         function(err, res) {
  //           if (err) throw err;
  //           console.log("Document inserted");
  //           db.close();
  //         }
  //       );
  //     }
  //   });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
