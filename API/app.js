const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const authRoutes = require("./routes/auth");
const sessionRoutes = require("./routes/session");
const userRoutes = require("./routes/user");
const weatherRoutes = require("./routes/weather");
const pushNotificationsRoutes = require("./routes/pushNotifications");
const tripsRoutes = require("./routes/trips");

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Home route for pinging
app.get("/", (req, res, next) => {
  try {
    res.status(200).json({ message: "You are pinging the home" });
  } catch (err) {
    return next(err);
  }
});

// Prefix the various routes required above and pass middleware!
app.use("/api/auth", authRoutes);
app.use("/api/session", sessionRoutes);
app.use("/api/user", userRoutes);
app.use("/api/pushNotifications", pushNotificationsRoutes);
app.use("/api/weather", weatherRoutes);
app.use("/api/trips", tripsRoutes);

// Error handling - if above routes middleware does not work, this gets called
// it then forwards the error, caught then by next middleware
app.use((req, res, next) => {
  const err = new Error();
  err.message = "Route not found";
  err.status = 404;
  next(err);
});

// catch all other errors (need to call next there though)
app.use((error, req, res) => {
  console.log("ERROR HANDLER", error.message);
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message || "Ooops, something went wrong!"
    }
  });
});

const port = process.env.PORT || 8081;
app.listen(port, () => console.log(`Server started on port ${port}`));
