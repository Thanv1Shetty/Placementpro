const mongoose = require("mongoose");

const driveSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  cgpa: Number,
  branch: String,
  backlogs: Number
});

module.exports = mongoose.model("Drive", driveSchema);