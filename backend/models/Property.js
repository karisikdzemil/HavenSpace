const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const PropertySchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    location: {
      city: {
        type: String,
        required: true,
      },
      address: {
        type: String,
        required: true,
      },
      lat: {
        type: Number,
        required: true,
      },
      lng: {
        type: Number,
        required: true,
      },
    },
    description: {
      type: String,
      required: true,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    images: [String],
    type: {
      type: String,
      enum: ["house", "apartment"],
      required: true,
    },
    bedNum: {
      type: Number,
      required: true,
    },
    bathNum: {
      type: Number,
      required: true,
    },
    area: {
      type: Number,
      required: true,
    },
    garage: {
      type: Number,
      required: true,
      default: 0,
    },
    status: {
      type: String,
      enum: ["active", "sold", "rented"],
      default: "active",
    },
    interiorFeatures: [String],
    exteriorFeatures: [String],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Property", PropertySchema);
