const db = require("../models"); // automatically gets index.js file

exports.saveTrip = async (req, res, next) => {
  try {
    const tripToSave = req.body;
    const savedTrip = await db.Trip.create(tripToSave);
    const userToUpdate = await db.User.findById(req.params.userId);
    await userToUpdate.trips.push(savedTrip);
    await userToUpdate.save();
    res.status(200).json(tripToSave);
  } catch (err) {
    return next(err);
  }
};

exports.getUserTrips = async (req, res, next) => {
  try {
    const tripsToDisplay = await db.Trip.find({ userId: req.params.userId });
    console.log(tripsToDisplay);
    res.status(200).json(tripsToDisplay);
  } catch (err) {
    return next(err);
  }
};

exports.getAllTrips = async (req, res, next) => {
  try {
    const allTrips = await db.Trip.find()
      .populate("userId")
      .exec();
    res.status(200).json(allTrips);
  } catch (err) {
    return next(err);
  }
};

exports.deleteTrip = async (req, res, next) => {
  try {
    await db.Trip.findByIdAndDelete(req.params.tripId);
    const response = {
      message: "Trip successfully deleted",
      id: req.params.tripId
    };
    return res.status(200).json(response);
  } catch (err) {
    return next(err);
  }
};
