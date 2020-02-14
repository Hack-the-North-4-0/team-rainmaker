const { createApplication } = require('tegud-lambda-api');
const cors = require('cors');
const app = createApplication();

app
  .use(cors());

module.exports = app.export();
