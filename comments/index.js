require('dotenv').config();
const http = require('http');
const toobusy = require('toobusy-js');

const app = require('./src/app');
const { logger } = require('./src/utils');
const config = require('./src/config');

const { port, applicationName, applicationVersion } = config;
const server = http.createServer(app);

function gracefulShutdown() {
  // Prevent the server from receiving anymore incoming requests
  server.close((error) => {
    // TODO Disconnect from database
    toobusy.shutdown();
    if (error) {
      process.exit(error ? 1 : 0);
    }

    logger.info('Shutting down server');
  });
}

// listen for terminal kill signals
server.on('SIGINT', gracefulShutdown);
server.on('SIGTERM', gracefulShutdown);


server.listen(port, function () {
  logger.info(
    `${applicationName} v${applicationVersion} is now running on port ${port} in ${process.env.NODE_ENV} mode`
  );
});

module.exports = server;
