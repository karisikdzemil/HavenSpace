const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const PropertySchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  owner:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  images: [String]
});

module.exports = mongoose.model("Property", PropertySchema);
