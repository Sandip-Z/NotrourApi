const mongoose = require("mongoose");

const tourSchema = new mongoose.Schema({
  name: {
    required: [true, "Tour requires a name"],
    type: String,
    unique: true,
    trim: true,
  },
  price: {
    required: [true, "Tour required a price"],
    type: Number,
  },
  rating: {
    type: Number,
    default: 3.0,
  },
  duration: {
    type: Number,
    required: [true, "Tour required a duration"],
  },
  maxGroupSize: {
    type: Number,
    required: [true, "Tour requires a max group size"],
  },
  difficulty: {
    type: String,
    required: [true, "Tour requires a difficulty"],
  },
  ratingsQuantity: {
    type: Number,
    default: 0,
  },
  ratingsAverage: {
    type: Number,
    default: 3.5,
  },
  priceDiscount: {
    type: Number,
  },
  summary: {
    type: String,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
    required: [true, "A tour requires a description"],
  },
  imageCover: {
    type: String,
    required: [true, "A tour requires a image cover"],
  },
  images: [String],
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  startDates: [Date],
});

module.exports = mongoose.model("Tour", tourSchema);
