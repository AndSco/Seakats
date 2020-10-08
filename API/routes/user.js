const express = require("express");
const router = express.Router();
const { getUser, editUser, deleteUser } = require("../handlers/user");

// Prefixed with /api/user
router.get("/:userId/", getUser);
router.patch("/:userId/", editUser);
router.delete("/:userId/", deleteUser);

module.exports = router;
