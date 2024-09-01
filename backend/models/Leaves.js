const mongoose = require("mongoose");

const leaveSchema = new mongoose.Schema({
  reason: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  approved: {
    type: Boolean,
    default: false,
  },
});

const leave = mongoose.model("leave", leaveSchema);
module.exports = leave;
