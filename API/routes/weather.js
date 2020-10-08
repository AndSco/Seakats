const express = require("express");
const router = express.Router();
const { getTodayWeather, getFollowingWeather } = require("../handlers/weather");

router.get("/one", async (req, res, next) => {
  try {
    const weatherData = await getTodayWeather();
    res.status(200).json(weatherData);
  } catch (err) {
    return next(err);
  }
});

router.get("/:dayNumber", async (req, res, next) => {
  try {
    const weatherData = await getFollowingWeather(req.params.dayNumber);

    res.status(200).json(weatherData);
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
