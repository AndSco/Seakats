const mongoose = require("mongoose");

const tripSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },

  from: {
    type: String,
    required: true
  },

  to: {
    type: String,
    required: true
  },

  date: {
    type: Date,
    default: new Date()
  },

  departureTime: {
    type: String
  },

  arrivalTime: {
    type: String
  },

  hoursPaddled: {
    type: Number
  },

  distancePaddled: {
    type: Number
  },

  wind: {
    type: String
  },

  sea: {
    type: String
  }
});

const Trip = mongoose.model("Trip", tripSchema);

module.exports = Trip;
