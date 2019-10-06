const program = require("commander");
const mongoose = require("mongoose");
const Game = require("../models/game");
const AWS = require("aws-sdk");
const request = require("request-promise");
const url = require("url");
const path = require("path");

program.option("-b, --bucket <bucket>", "bucket", "beatpricesup");
program.option("-f, --folder <folder>", "folder", "games");
program.option("-p, --page <page>", "page", 1);
program.option("--page-size <pageSize>", "page size", 50);
program.option("-d, --debug", "debug");
program.option("-s, --silent", "silent");

program.parse(process.argv);

const offset = (program.page - 1) * program.pageSize;

AWS.config.update({
  accessKeyId: process.env.S3_KEY,
  secretAccessKey: process.env.S3_SECRET
});

const s3 = new AWS.S3();

mongoose
  .connect(process.env.APP_DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    const db = mongoose.connection;
    db.on("error", error => console.error(error));

    return Game.find({ image_local: null })
      .skip(offset)
      .limit(parseInt(program.pageSize))
      .exec();
  })
  .then(async (games, err) => {
    for (let index = 0; index < games.length; index++) {
      let game = games[index];
      imageName = path.basename(url.parse(game.image).pathname);
      await request({
        uri: "http:" + game.image,
        encoding: null
      })
        .then(body => {
          return s3
            .upload({
              Bucket: program.bucket,
              Key: program.folder + "/" + imageName,
              Body: body,
              ContentType: "image/jpeg"
            })
            .promise();
        })
        .then(upload => {
          return Game.findOneAndUpdate(
            { id: game.id },
            { image_local: upload.Location },
            {
              useFindAndModify: false
            }
          ).exec();
        })
        .catch(err => {
          console.error("Cannot save imported image: " + err);
        });
    }
  })
  .then(() => {
    if (!program.silent) {
      console.info(`images exported page=${program.page}`);
    }
    mongoose.connection.close();
  })
  .catch(err => {
    console.error(err);
    mongoose.connection.close();
  });
