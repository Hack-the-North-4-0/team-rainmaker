const { createApplication } = require('tegud-lambda-api');

const app = createApplication();

app
  .addHandler('getTeamUsage', async (req, res) => {
    return res.ok();
  });

module.exports = app;
