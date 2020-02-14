const { createApplication } = require('tegud-lambda-api');
const { MongoClient } = require('mongodb');

const app = createApplication();

const connectToMongo = (url) => new Promise((resolve, reject) => {
  MongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
    if (err) {
      console.log(`Error connecting to mongo`);
      console.log(err.message);
      reject(err);
      return;
    }

    console.log(`Connected to mongo`);

    resolve(client);
  })
});

const connectToDb = (client, db) => {
  return client.db(db);
};

const insertDocument = (db, collectionName, doc) => new Promise((resolve, reject) => {
  const collection = db.collection(collectionName);
  collection.insertOne(doc, (err, result) => {
    if (err) {
      reject(err);
      return;
    }

    resolve();
  });
});

const getAllGames = (db, collectionName) => new Promise((resolve, reject) => {
  console.log('getting games');

  const collection = db.collection(collectionName);
  collection.find((err, cursor) => {
    if (err) {
      reject(err);
      return;
    }
    cursor.toArray().then((results) => resolve(results));
  });
});

app
  .addHandler('createGame', async (req, res) => {
    const client = await connectToMongo(process.env.mongo_url);
    const db = connectToDb(client, process.env.mongo_db);

    await insertDocument(db, 'game-state', {
      round: 0,
      remainingQuestions: [],
    });

    return res.ok();
  })
  .addHandler('listGames', async (req, res) => {
    const client = await connectToMongo(process.env.mongo_url);
    const db = connectToDb(client, process.env.mongo_db);

    const games = await getAllGames(db, 'game-state');

    return res.ok({ games });
  });

module.exports = app;
