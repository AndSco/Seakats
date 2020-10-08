const mongoose = require("mongoose");
const config = require("../config");

mongoose.set("debug", true);
mongoose.set("useFindAndModify", false); // To use findOneAndUpdate
mongoose.Promise = Promise; // allows us to do without CALLBACKS!

mongoose.connect(
  config.mLabURI,
  {
    keepAlive: true,
    useNewUrlParser: true,
    useCreateIndex: true
  },
  () => console.log("Mongo connected!")
);

module.exports.User = require("./user");
module.exports.Trip = require("./trip");
module.exports.Session = require("./session");
