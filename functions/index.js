const functions = require("firebase-functions");
const admin = require("firebase-admin");
const {
  getGamesAmerica,
  getGamesEurope,
  getGamesJapan
} = require("nintendo-switch-eshop");

var serviceAccount = require("./serviceAccountKey.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://eshop-46869.firebaseio.com"
});

const db = admin.firestore();

exports.importGamesList = functions.https.onRequest(async (req, res) => {
  // getGamesEurope()
  //   .then(data => {
  //     data.forEach(row => {
  //       let docRef = db.collection("games").doc(row.fs_id);
  //       docRef.set({
  //         id: row.fs_id,
  //         title: row.title
  //       });
  //     });
  //     return res.status(200).send({ success: "OK", errors: [] });
  //   })
  //   .catch(err => {
  //     res.status(500).send({ success: "OK", errors: [err] });
  //   });
});
