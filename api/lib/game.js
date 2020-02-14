const { createApplication } = require('tegud-lambda-api');
const { MongoClient } = require('mongodb');

const app = createApplication();

const connectToMongo = (url) => new Promise((resolve, reject) => {
  MongoClient.connect(url, (err, client) => {
    if (err) {
      reject(err);
      return;
    }
   
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

    console.log(result);
  });
});


app
  .addHandler('createGame', async (req, res) => {
    const client = await connectToMongo(process.env.mongo_url);
    const db = connectToDb(client, process.env.mongo_db);

    console.log('Inserting document');

    await insertDocument(db, 'game-state', {
      round: 0,
      remainingQuestions: [],
    });

    return res.ok();
  });

module.exports = app;
