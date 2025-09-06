const express = require("express");
const { signup, login, logout, purchasedCourses } = require("../controllers/user.control");
const usermiddleware = require("../middlewares/user.mid");

const router = express.Router();

router.post("/sigup", signup);
router.post('/login',login);
router.get('/logout',logout)

router.get('/purchases',usermiddleware, purchasedCourses)

module.exports = router;
