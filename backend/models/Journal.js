const mongoose = require("mongoose");

const journalSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  department: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  volume: {
    type: String,
    required: true,
  },
  issue: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  otherInfo: {
    type: String,
    required: true,
  },
  approved: {
    type: Boolean,
    default: false,
  },
});

const journal = mongoose.model("journal", journalSchema);
module.exports = journal;
