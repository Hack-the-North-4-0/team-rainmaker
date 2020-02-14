const { createApplication } = require('tegud-lambda-api');
const cors = require('cors');

const game = require('./lib/game');

const app = createApplication();

app
  .use(cors())
  .use(game);

module.exports = app.export();
