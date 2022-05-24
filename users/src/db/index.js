const mongoosePaginate = require('mongoose-paginate-v2');

const { logger } = require('../utils');

class Database {
  constructor(database, config = {}) {
    this.config = config;
    this.database = database;
    this.databaseUri = config.connectionString;

    this.database.plugin(mongoosePaginate);
    this.database.set('debug', config.mongooseDebugMode);

    // options
    this.connectionOptions = {
      // Amount of concurrent socket connections,
      maxPoolSize: config.connectionPoolSize,
      // useNewUrlParser: true,
      // useFindAndModify: false,
      // useCreateIndex: true,
      useUnifiedTopology: true,
      autoIndex: true,
      ssl: ["staging", "production"].indexOf(process.env.NODE_ENV) > -1,
      dbName: config.dbName,
    };

  }

  connect() {
    // create database
    return new Promise((resolve, reject) => {

      if (
        process.env.MONGO_DB_AUTH === "true"
        && ["staging", "production"].indexOf(process.env.NODE_ENV) > -1
      ) {
        this.connectionOptions.user = this.config.dbUser;
        this.connectionOptions.pass = this.config.dbPassword;
      }

      let attempts = 0;
      const connectWithRetry = (uri, options) => {
        return this.database.connect(uri, options)
          .then(conn => {
            logger.info("Successfully connected to database");
            resolve(conn);
          })
          .catch((e) => {
            ++attempts;
            if (attempts > process.env.DB_MAX_RETRIES) {
              logger.error("Exhausted max retries for database connection", e);
              // reject(error)
              process.exit(1);
            }

            logger.info(
              `The server was unable to connect to database, Retrying... [retry count: ${attempts}]`,
            );

            setTimeout(() => connectWithRetry(this.databaseUri, this.connectionOptions), attempts * 1000);
          });
      };

      return connectWithRetry(this.databaseUri, this.connectionOptions);
    });
  }
}

module.exports = Database
