const mongoose = require("mongoose");
const { registerSchema } = require('swaggiffy');

const schema = new mongoose.Schema({
  chasisNumber: {
    type: String,
    required: true,
  },
  manufacturer: {
    type: String,
    required: true,
  },
  manufactureYear: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  plateNumber: {
    type: String,
    required: true
  },
  modelName: {
    type: String,
    required: true,
  },
  ownerNationalId: {
    type: mongoose.Schema.Types.String,
    ref: 'VehicleOwner',
    required: true,
  }
});

registerSchema("Vehicle", schema, { orm: "mongoose" });

module.exports = mongoose.model("Vehicle", schema);