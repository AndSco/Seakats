const express = require("express");
const router = express.Router();
const {
  sendNotification,
  notifyAllIsOk
} = require("../handlers/pushNotifications");

router.post("/send", sendNotification);
router.post("/:userId/allIsOk", notifyAllIsOk);

module.exports = router;
