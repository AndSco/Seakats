const mongoose = require("mongoose");
const https = require("https");
const {
  sendNotification,
  sendReminderToPaddler
} = require("../handlers/pushNotifications");

const sessionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },

  departurePoint: {
    type: String
  },

  destination: {
    type: String
  },

  departureTimeStamp: {
    type: Number
  },

  arrivalTimeStamp: {
    type: Number
  },

  mobile: {
    type: Boolean,
    default: false
  },

  vhf: {
    type: String,
    default: null
  },

  isActive: {
    type: Boolean,
    default: true
  },

  isToBeAlerted: {
    type: Boolean,
    default: false
  },

  lastLatitude: {
    type: Number
  },

  lastLongitude: {
    type: Number
  },

  lastLocationTimeStamp: {
    type: Number
  }
});

let runningTimeouts = {};

// To let the post save hook whether the document is newly created or not;
sessionSchema.pre("save", function(next) {
  this.wasNew = this.isNew;
  next();
});

sessionSchema.post("save", function() {
  if (this.wasNew) {
    // to avoid the timeout being regenerated at later saves, when I set active to false
    this.startTimeout();
    this.remindPaddler();
  }
  return;
});

sessionSchema.methods.startTimeout = function() {
  console.log("Timeout started");
  const waitingTime = this.arrivalTimeStamp - this.departureTimeStamp;
  runningTimeouts[this._id] = setTimeout(async () => {
    console.log("runningTimeouts", runningTimeouts);
    const session = await Session.findOne({ _id: this._id });
    await session.deleteInterval();
    await session.deleteTimeout();
    session.isActive = false;
    session.isToBeAlerted = true;
    await session.save();
    // trigger push notifications from server!
    sendNotification();
  }, waitingTime);
};

sessionSchema.methods.remindPaddler = function() {
  const shortBeforeETA =
    this.arrivalTimeStamp - this.departureTimeStamp - 20000;
  setTimeout(() => {
    sendReminderToPaddler(this.userId);
  }, shortBeforeETA);
};

sessionSchema.methods.deleteTimeout = function() {
  console.log("Session ID", this._id);
  clearTimeout(runningTimeouts[this._id]);
  delete runningTimeouts[this._id];
  console.log("runningTimeouts", runningTimeouts);
};

// PINGING TIMEOUTS??
let pingingIntervals = {};

console.log("PINGING INTERVALS", pingingIntervals);

// Start the pinging only when a session is open!
sessionSchema.post("save", function() {
  if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
    console.log("NO PINGING IN DEV MODE!");
  } else {
    console.log("Start pinging");
    pingingIntervals[this._id] = setInterval(() => {
      https.get("https://seakats-api.herokuapp.com/");
      console.log("Pinging");
    }, 10000);
  }
});

sessionSchema.methods.deleteInterval = function() {
  if (pingingIntervals[this._id]) {
    clearInterval(pingingIntervals[this._id]);
    delete pingingIntervals[this._id];
    console.log("pingingIntervals", pingingIntervals);
  } else {
    console.log("INTERVAL ALREADY DELETED");
    return;
  }
};

const Session = mongoose.model("Session", sessionSchema);

module.exports = Session;
