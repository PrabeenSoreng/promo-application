const mongoose = require("mongoose");
const data = require("./data.js");
const dotenv = require("dotenv");

dotenv.config({
  path: "../config.env",
});

class DB {
  constructor() {
    this.collections = Object.keys(data).map((collection) => collection);
  }

  async cleanDb() {
    for (let collection of this.collections) {
      var model = data[collection].model;
      if (model) {
        await model.deleteMany({}, () => {});
        console.log(
          `Data for model ${model.collection.collectionName} Deleted!`
        );
      }
    }
  }

  async pushDataToDb() {
    var collectionToResolve = [];
    for (let collection of this.collections) {
      collectionToResolve.push(
        Promise.all(
          data[collection].items.map((item) =>
            new data[collection].model(item).save()
          )
        ).then((data) => console.log(collection, "collection saved!"))
      );
    }

    return Promise.all(collectionToResolve);
  }

  async seedDb() {
    await this.cleanDb();
    await this.pushDataToDb();
    console.log("Data Populated!");
  }
}

const DATABASE = process.env.DATABASE.replace(
  "<password>",
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DATABASE, { useNewUrlParser: true })
  .then(async () => {
    const db = new DB();
    await db.seedDb();
    console.log("You can close connection now!");
  })
  .catch((err) => console.log(err));
