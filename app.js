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
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
