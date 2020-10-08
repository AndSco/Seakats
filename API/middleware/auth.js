require("dotenv").config();
const jwt = require("jsonwebtoken");
const config = require("../config");

//function to make sure is logged in = Authentication
// Passed as middleware to all api routes in app.js
exports.loginRequired = function(req, res, next) {
  try {
    // console.log("MIDDLEWARE!");
    const token = req.headers.authorization.split(" ")[1]; // get token from the headers. Split because the token is after the word Bearer and space
    jwt.verify(token, config.jwtSecret, function(err, decoded) {
      if (decoded) {
        return next();
      } else {
        return next({
          status: 401,
          message: "Please log in first"
        }); //if token could not be decoded
      }
    }); // we use secret key to decode token
  } catch (err) {
    return next({
      status: 401,
      message: "Please log in first"
    });
  }
};

//function to make sure we get the correct user = Authorisation
exports.ensureCorrectUser = function(req, res, next) {
  try {
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, config.jwtSecret, function(err, decoded) {
      if (decoded && decoded.id === req.params.id) {
        // if the token refers to the RIGHT USER
        return next();
      } else {
        return next({
          status: 401,
          message: "Unauthorized!"
        });
      }
    });
  } catch (err) {
    return next({
      status: 401,
      message: "Unauthorized!"
    });
  }
};
