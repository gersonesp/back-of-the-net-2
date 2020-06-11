const path = require("path");
require("dotenv").config({
  path: path.join(__dirname, "..", ".env"),
});

module.exports = {
  mongoUri: process.env.MONGO_URI,
  passportSecret: process.env.PASSPORT_SECRET,
};
