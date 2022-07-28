const winston = require("winston");
require("winston-mongodb");

const { mongoose } = require("../models/mongo");
const {format, createLogger, transports} = require("winston");
const logger = createLogger({
  level: "silly",
  format: format.json(),
  defaultMeta: { service: "user-service" },
  transports: [
    new transports.MongoDB({
      db: mongoose.connection,
      collection: "logs",
      format: format.metadata()
    }),
  ],
});

//
// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
//
if (process.env.NODE_ENV !== "production") {
  logger.add(
    new winston.transports.Console({
      format: format.combine(
        format.errors({ stack: true }),
        format.simple()
      )
    })
  );
}

module.exports = logger;
