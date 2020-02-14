const { createApplication } = require('tegud-lambda-api');
const { MongoClient } = require('mongodb');

const app = createApplication();

const connectToMongo = (url) => new Promise((resolve, reject) => {
  MongoClient.connect(url, (err, client) => {
    if (err) {
      reject(err);
    }
   
    resolve(client);
  })
});

const connectToDb = (client, db) => {
  return client.db(db);
};

const insertDocument = (db, collection, doc) => {
  
};

app
  .addHandler('createGame', async (req, res) => {
    const mongoClient = await connectToMongo(process.env.mongo_url);
    const db = connectToDb(client, process.env.mongo_db);

    return res.ok();
  });

module.exports = app;
