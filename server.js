require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");

mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
const db = mongoose.connection;

db.on("error", error => console.error(error));

app.use(express.json());
app.use(cors());

const gamesRouter = require("./routes/games");
const pricesRouter = require("./routes/prices");
app.use("/games", gamesRouter);
app.use("/prices", pricesRouter);

app.listen(process.env.APP_PORT, () => {});

module.exports = app;
