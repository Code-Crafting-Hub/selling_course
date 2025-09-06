const express = require("express");
const { signup, login, logout } = require("../controllers/admin.control");

const router = express.Router();

router.post("/sigup", signup);
router.post("/login", login);
router.get("/logout", logout);

module.exports = router;
