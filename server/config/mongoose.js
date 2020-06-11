// const MongoClient = require("mongodb").MongoClient;
const mongoose = require("mongoose");
const { mongoUri } = require("./keys");

// async function main() {
//   const uri = mongoUri;

//   const options = {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   };

//   const client = new MongoClient(uri, options);

//   try {
//     await client.connect();
//     console.log("Connected to cluster!!");
//   } catch (err) {
//     console.error(err);
//   } finally {
//     await client.close();
//   }
// }

// main().catch(console.error);

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
};

mongoose
  .connect(mongoUri, options)
  .then(() => {
    // eslint-disable-next-line no-console
    console.log("Connected to MongoDB.");
  })
  .catch((err) => {
    // eslint-disable-next-line no-console
    console.log(err);
  });
