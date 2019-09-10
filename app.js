const fs = require("fs");
const {
  getGamesAmerica,
  getGamesEurope,
  getGamesJapan,
  getPrices
} = require("nintendo-switch-eshop");

// getGamesEurope().then(data => {
//   fs.writeFile("./storage/data/europe.json", JSON.stringify(data), err => {
//     if (err) {
//       console.error(`Cannot save file ./storage/data/europe.json`);
//     }
//   });
// });

// getGamesAmerica().then(data => {
//   fs.writeFile("./storage/data/america.json", JSON.stringify(data), err => {
//     if (err) {
//       console.error(`Cannot save file ./storage/data/america.json`);
//     }
//   });
// });

// getGamesJapan().then(data => {
//   fs.writeFile("./storage/data/japan.json", JSON.stringify(data), err => {
//     if (err) {
//       console.error(`Cannot save file ./storage/data/japan.json`);
//     }
//   });
// });

getPrices("PL", ["70010000015597", "70010000020271"]).then(data => {
  console.info(data.prices);
});
