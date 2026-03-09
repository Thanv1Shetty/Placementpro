const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: "Student" },
  drive: { type: mongoose.Schema.Types.ObjectId, ref: "Drive" },
  status: {
    type: String,
    default: "Applied"
  }
});

module.exports = mongoose.model("Application", applicationSchema);