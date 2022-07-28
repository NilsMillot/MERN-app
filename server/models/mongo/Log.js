const mongoose = require("./db");

const LogSchema = new mongoose.Schema({
  level: String,
  message: String,
  meta: {
    service: String
  },
  timestamp: Date
});

const Log = new mongoose.model("Log", LogSchema);

module.exports = Log;
