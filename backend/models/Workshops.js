const mongoose = require("mongoose");

const workshopSchema = new mongoose.Schema({
  mail: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  venue: {
    type: String,
    required: true,
  },
  started: {
    type: Date,
    required: true,
  },
  ended: {
    type: Date,
    required: true,
  },
  days: {
    type: String,
    required: true,
  },
  approved: {
    type: Boolean,
    default: false,
  },
});

const workshops = mongoose.model("workshop", workshopSchema);
module.exports = workshops;
