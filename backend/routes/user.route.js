const express = require("express");
const { signup } = require("../controllers/user.control");

const router = express.Router();

router.post("/sigup", signup);

module.exports = router;
