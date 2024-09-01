const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://naranaveen:Naveen576@fms.2z27b.mongodb.net/?retryWrites=true&w=majority&appName=FMS"
    );
    console.log("Connected");
  } catch (error) {
    console.log(error);
  }
};

module.exports = connectDB;
