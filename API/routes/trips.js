const express = require("express");
const router = express.Router();
const {
  getAllTrips,
  saveTrip,
  getUserTrips,
  deleteTrip
} = require("../handlers/trips");

router.get("/", getAllTrips);
router.delete("/:tripId", deleteTrip);
router.post("/:userId", saveTrip);
router.get("/:userId", getUserTrips);

module.exports = router;
