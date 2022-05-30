require('dotenv').config()
/**
 * Exports environment specific configuration for app
 */

const { name, version } = require("../../package.json");

const commonConfig = {
  connectionPoolSize: 20,
  port: process.env.PORT || 8083,
  bodyLimit: process.env.BODY_LIMIT || "20kb",
  allowedOrigins: process.env.ALLOWED_ORIGINS || "*",
  applicationName: name,
  applicationVersion: version,
  socketTimeoutMS: process.env.SOCKET_TIMEOUT_MS,
  jwtSecret: process.env.JWT_AUTH_SECRET,
  expiresIn: '720h'
  // clientUrl: process.env.CLIENT_URL || "",
};

const appConfig = {
  development: {
    ...commonConfig,
    logFormat: 'dev',
    mongooseDebugMode: true,
    dbName: process.env.DATABASE_NAME,
    mongoAuth: process.env.MONGO_DB_AUTH,
    connectionString: `mongodb://${process.env.DATABASE_URI
  }:${process.env.DATABASE_PORT}/${process.env.DATABASE_NAME}`,
  dbHost: process.env.DATABASE_HOST || '127.0.0.1',
  dbPort: process.env.DATABASE_PORT || 27017,
  dbUser: encodeURIComponent(process.env.DATABASE_USER),
  dbPassword: encodeURIComponent(process.env.DATABASE_PASSWORD),
  userServiceUrl: 'http://localhost:8085/api/v1',
},
production: {
  ...commonConfig,
  dbName: process.env.DATABASE_NAME,
  mongooseDebugMode: false,
  dbUser: encodeURIComponent(process.env.DATABASE_USER),
  dbPassword: encodeURIComponent(process.env.DATABASE_PASSWORD),
  dbHost: process.env.DATABASE_HOST,
  dbPort: process.env.DATABASE_PORT || 27017,
  connectionString: `mongodb+srv://${encodeURIComponent(
    process.env.DATABASE_USER,
    )}:${encodeURIComponent(process.env.DATABASE_PASSWORD)}@${process.env.DATABASE_HOST
    }/${process.env.DATABASE_NAME}?retryWrites=true&w=majority`,
    mongoAuth: process.env.MONGO_DB_AUTH,
    userServiceUrl: process.env.USER_SERVICE_URL || 'http://localhost:8085/api/v1',
    logFormat: "combined"
  }
};

const { NODE_ENV } = process.env;
module.exports = appConfig[NODE_ENV || 'development']
