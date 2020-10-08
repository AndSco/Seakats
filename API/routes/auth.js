const express = require("express");
const router = express.Router();
const { signup, login } = require("../handlers/auth");

// full path: /api/auth... - set in app.js middleware
router.post("/login", login);
router.post("/signup", signup);

module.exports = router;
