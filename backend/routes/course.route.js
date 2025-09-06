const express = require("express");
const {
  createCourse,
  updateCourse,
  deleteCourse,
  getCourses,
  courseDetail,
  buyCourses,
} = require("../controllers/course.controller");
const usermiddleware = require("../middlewares/user.mid");
const adminMiddleware = require("../middlewares/admin.mid");

const router = express.Router();

router.post("/create",adminMiddleware, createCourse);
router.put("/update/:courseId",adminMiddleware, updateCourse);
router.delete("/delete/:courseId",adminMiddleware, deleteCourse);
router.get("/courses", getCourses);
router.get("/:courseId", courseDetail);

router.post('/buy/courseId',usermiddleware,buyCourses)

module.exports = router;
