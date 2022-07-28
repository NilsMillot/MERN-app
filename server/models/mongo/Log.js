const mongoose = require("./db");

const LogSchema = new mongoose.Schema({
  level: string,
  message: string,
  meta: string
}, {
  timestamps: true
});

const Log = new mongoose.model("Log", LogSchema);

module.exports = Log;
