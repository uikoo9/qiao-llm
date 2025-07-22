// mcp
const { startHttpServer } = require('../util/mcp.js');

/**
 * aws controller
 */
module.exports = (app) => {
  // mcp
  app.post('/mcp', (req, res) => {
    startHttpServer(req, res);
  });
};
