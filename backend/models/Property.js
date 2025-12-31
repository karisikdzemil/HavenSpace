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
  location: {
    type: String,
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
  images: [String],
  typeSelling: {
    type: String,
    enum: ["rent", "sale"],
    required: true,
  },
  bedNum: {
    type: Number,
    required: true
  },  
  bathNum: {
    type: Number,
    required: true
  },
  area: {
    type: Number,
    required: true
  },
  garage: {
    type: Number,
    required: true
  },
  interiorFeatures: [String],
  exteriorFeatures: [String],
},
  {
    timestamps: true, 
  }

);

module.exports = mongoose.model("Property", PropertySchema);
