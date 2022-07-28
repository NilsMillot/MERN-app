const { Router } = require("express");
const Log = require("../models/mongo/Log");
const mongoose = require("mongoose");
const logger = require("../lib/logger");
const router = new Router();

router.get("/", async (req, res) => {
  try {
    const result = await Log.find({});
    logger.silly("silly log");
    logger.debug("debug log");
    logger.verbose("verbose log");
    logger.http("http log");
    logger.info("info log");
    logger.warn("warn log");
    logger.error("error log");
    res.json(result);
  } catch (error) {
    res.sendStatus(500);
    console.log(error.message);
    logger.error(error);
  }
});

module.exports = router;
