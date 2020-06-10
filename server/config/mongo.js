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

    // TODO Remove
    await listDatabases(client);
  } catch (err) {
    console.error(err);
  } finally {
    await client.close();
  }
}

main().catch(console.error);

// TODO Remove
async function listDatabases(client) {
  databasesList = await client.db().admin().listDatabases();

  console.log("Databases:");
  databasesList.databases.forEach((db) => console.log(` - ${db.name}`));
}
