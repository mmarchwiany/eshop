require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");

mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
const db = mongoose.connection;

db.on("error", error => console.error(error));
db.on("open", () => console.log("Connected to database"));

app.use(express.json());

const gamesRouter = require("./routes/games");
const pricesRouter = require("./routes/prices");
app.use("/games", gamesRouter);
app.use("/prices", pricesRouter);

app.listen(3000, () => {
  console.log("Server started");
});
