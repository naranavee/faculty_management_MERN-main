const mongoose = require("mongoose");

const facultySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  mobile: {
    type: String,
    required: true,
  },
  dob: {
    type: Date,
    required: true,
  },
  doj: {
    type: Date,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  designation: {
    type: String,
    required: true,
  },
  department: {
    type: String,
    required: true,
  },
  qualification: {
    type: String,
    required: true,
  },
  salary: {
    type: Number,
    required: true,
  },
  married: {
    type: String,
    required: true,
  },
  leaves: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "leave",
    },
  ],

  journals: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "journal",
    },
  ],

  workshops: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "workshop",
    },
  ],

  attendance: [],
});

const faculty = mongoose.model("faculty", facultySchema);
module.exports = faculty;
