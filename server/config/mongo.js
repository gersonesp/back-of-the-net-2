const MongoClient = require("mongodb").MongoClient;
const { mongoUri } = require("./keys");

async function main() {
  const uri = mongoUri;

  const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };

  const client = new MongoClient(uri, options);

  try {
    await client.connect();
    console.log("Connected to cluster!!");
  } catch (err) {
    console.error(err);
  } finally {
    await client.close();
  }
}

main().catch(console.error);
