const express = require("express");
const router = express.Router();
const {
  openSessionOnServer,
  deleteSession,
  getSessionsToBeAlerted,
  solveAlert,
  solveAllAlerts,
  updateSessionPosition,
  editSession,
  getOpenSessions,
  getOverdueSessions,
  killLongOverdueSessions
} = require("../handlers/session");

// All prefixed with "/api/session"
router.post("/open", openSessionOnServer);
router.delete("/:sessionId", deleteSession);
router.get("/alerts", getSessionsToBeAlerted);
router.get("/currentlyOpen", getOpenSessions);
router.get("/overdue", getOverdueSessions);
router.get("/killLongOverdue", killLongOverdueSessions);
router.post("/alerts/:sessionId", solveAlert);
router.patch("/alerts", solveAllAlerts);
router.patch("/alerts/:sessionId", editSession);
router.patch("/:sessionId/updatePosition", updateSessionPosition);

module.exports = router;
