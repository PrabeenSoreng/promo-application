const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);

const DB = process.env.DATABASE.replace(
  "<password>",
  process.env.DATABASE_PASSWORD
);

exports.initSessionStore = function () {
  const store = new MongoDBStore({
    uri: DB,
    collection: "eincodeSessions",
  });
  store.on("error", (error) => console.log(error));
  return store;
};
