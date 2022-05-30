const dotenv = require('dotenv');
const cors = require('cors');
const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const mongoose = require('mongoose');
const { notFoundHandler, errorHandler } = require('./middleware');

const api = require('./routes');
const Database = require('./db');
const config = require('./config');
const { requestID, checkTraffic } = require('./utils');

class App {
  constructor() {
    this.app = express();
    this.config();
  }

  config() {
    dotenv.config();

    this.app.use(requestID());
    this.app.use(helmet());
    this.app.use(
      cors({
        origin: (origin, cb) => {
          if (config.allowedOrigins.trim() === "*") {
            cb(null, true);
          } else {
            const origins = config.allowedOrigins.split(",");
            if (origins.indexOf(origin) !== -1 || !origin) {
              cb(null, true);
            } else {
              cb(new Error(`Origin('${origin}') not allowed`, false));
            }
          }
        },
        optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
      })
    );
    // TODO: include a rate limiter middleware
    this.app.use(morgan(config.logFormat));
    this.app.use(
      express.json({
        limit: config.bodyLimit
      })
    );

    // support application/x-www-form-urlencoded post data
    this.app.use(express.urlencoded({ extended: false, limit: config.bodyLimit }));
    this.app.use(checkTraffic)

    // remove some headers here - Nginx will set them
    this.app.use((req, res, next) => {
      res.removeHeader("Vary");
      res.removeHeader("Strict-Transport-Security");
      next();
    });


    // routes
    this.app.use('/api', api);

    // connect to db
    const database = new Database(mongoose, config);
    database.connect();

    // unknown resource uri
    this.app.use(notFoundHandler);

    this.app.use('*', errorHandler);
  }
}

module.exports = new App().app;
