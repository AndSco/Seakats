const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const nodeMailgun = require("nodemailer-mailgun-transport");
const config = require("../config");
const moment = require("moment");
const db = require("../models"); // automatically gets index.js file

exports.openSessionOnServer = async function(req, res, next) {
  try {
    const newSession = await db.Session.create(req.body);
    return res.status(200).json(newSession);
  } catch (err) {
    return next(err);
  }
};

exports.editSession = async function(req, res, next) {
  try {
    //find session to edit
    const sessionToEdit = await db.Session.findOne({
      _id: req.params.sessionId
    });
    console.log("SESSION TO EDIT", sessionToEdit);
    // kill current timeout
    await sessionToEdit.deleteTimeout();
    // add the extra milliseconds
    sessionToEdit.waitingTime += +req.body.extraMins * 60000;
    sessionToEdit.arrivalTimeStamp += +req.body.extraMins * 60000;
    await sessionToEdit.save(); // THIS AUTOMATICALLY SETS TIMEOUT AGAIN - No more, I made it conditional to new savings
    await sessionToEdit.startTimeout(); // This needs to be explicitely called
    await sessionToEdit.remindPaddler();
    console.log("EDITED SESSION??", sessionToEdit);

    return res.status(200).json(sessionToEdit);
  } catch (err) {
    console.log(err);
  }
};

const deleteSessionFromDb = async sessionId => {
  await db.Session.findByIdAndRemove(sessionId);
};

exports.deleteSession = async function(req, res, next) {
  try {
    const sessionToKill = await db.Session.findById(req.params.sessionId);
    console.log("SESSION TO KILL", sessionToKill);
    await sessionToKill.deleteInterval(); // Kills the interval keeping the server alive by pinging it!
    await sessionToKill.deleteTimeout();
    //remove session from DB!
    await deleteSessionFromDb(req.params.sessionId);
    return res.status(200).json("session removed");
  } catch (err) {
    return next(err);
  }
};

exports.getSessionsToBeAlerted = async (req, res, next) => {
  try {
    const sessionsToBeAlerted = await db.Session.find({ isToBeAlerted: true })
      .populate("userId")
      .exec();
    res.status(200).json(sessionsToBeAlerted);
  } catch (err) {
    return next(err);
  }
};

exports.solveAlert = async (req, res, next) => {
  try {
    const sessionSolved = await db.Session.findById(req.params.sessionId);
    const { _id } = sessionSolved;
    await deleteSessionFromDb(_id);
    res.status(200).json("session removed from DB");
  } catch (err) {
    return next(err);
  }
};

exports.solveAllAlerts = async (req, res, next) => {
  try {
    const sessionsToRemove = await db.Session.find({ isToBeAlerted: true });
    sessionsToRemove.map(async session => {
      const { _id } = session;
      await deleteSessionFromDb(_id);
    });
    res.status(200).json("All alerts removed");
  } catch (err) {
    return next(err);
  }
};

// router.post("/:sessionId/updatePosition", updateSessionPosition);
exports.updateSessionPosition = async function(req, res, next) {
  try {
    const query = { _id: req.params.sessionId };
    console.log("POSITION IN BODY!", req.body.latitude);
    const sessionToUpdate = await db.Session.findOneAndUpdate(
      query,
      {
        lastLatitude: req.body.latitude,
        lastLongitude: req.body.longitude,
        lastLocationTimeStamp: req.body.timestamp
      },
      { upsert: true }
    );
    console.log("INSERTED POSITION");
    return res.status(200).json(sessionToUpdate);
  } catch (err) {
    return next(err);
  }
};

exports.getOpenSessions = async (req, res, next) => {
  try {
    const openSessions = await db.Session.find({
      isActive: true,
      arrivalTimeStamp: { $gte: new Date().getTime() }
    })
      .populate("userId")
      .exec();

    res.status(200).json(openSessions);
  } catch (err) {
    return next(err);
  }
};

exports.getOverdueSessions = async (req, res, next) => {
  try {
    const overdueSessions = await db.Session.find({
      isActive: true,
      arrivalTimeStamp: { $lt: new Date().getTime() }
    })
      .populate("userId")
      .exec();

    res.status(200).json({ overdueSessions: overdueSessions });
  } catch (err) {
    return next(err);
  }
};

exports.killLongOverdueSessions = async (req, res, next) => {
  try {
    // find stale active sessions up to one hour back from now
    const longOverdueSessions = await db.Session.find({
      isActive: true,
      arrivalTimeStamp: { $lt: new Date().getTime() - 3600000 }
    });

    if (longOverdueSessions.length < 1) {
      res.status(200).json({ message: "No long overdue sessions" });
      return;
    }
    // and delete them, if there is any
    longOverdueSessions.map(async session => {
      await session.deleteInterval();
      console.log("session", session);
      await deleteSessionFromDb(session._id);
    });
    res.status(200).json({ message: "overdue sessions deleted!" });
  } catch (err) {
    return next(err);
  }
};
