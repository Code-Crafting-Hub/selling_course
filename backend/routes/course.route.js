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

const router = express.Router();

router.post("/create", createCourse);
router.put("/update/:courseId", updateCourse);
router.delete("/delete/:courseId", deleteCourse);
router.get("/courses", getCourses);
router.get("/:courseId", courseDetail);

router.post('/buy/courseId',usermiddleware,buyCourses)

module.exports = router;
