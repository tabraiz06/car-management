const mongoose = require("mongoose");

const carSchema = new mongoose.Schema({
  title: String,
  description: String,
  tags: [String], // tags like car_type, company, dealer
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  images: [String], // array of image URLs
});

module.exports = mongoose.model("Car", carSchema);
