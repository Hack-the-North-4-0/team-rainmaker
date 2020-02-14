const { createApplication } = require('tegud-lambda-api');

const app = createApplication();

app
  .addHandler('createGame', async (req, res) => {
    return res.ok();
  });

module.exports = app;
