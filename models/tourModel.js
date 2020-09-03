const mongoose = require("mongoose");

const tourSchema = new mongoose.Schema({
  name: {
    required: [true, "Tour requires a name"],
    type: String,
    unique: true,
  },
  price: {
    required: [true, "Tour required a price"],
    type: Number,
  },
  rating: {
    type: Number,
    default: 3.0,
  },
});

module.exports = mongoose.model("Tour", tourSchema);
