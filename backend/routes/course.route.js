const express = require("express");
const {
  createCourse,
  updateCourse,
  deleteCourse,
  getCourses,
  courseDetail,
} = require("../controllers/course.controller");

const router = express.Router();

router.post("/create", createCourse);
router.put("/update/:courseId", updateCourse);
router.delete("/delete/:courseId", deleteCourse);
router.get("/courses", getCourses);
router.get("/:courseId", courseDetail);

module.exports = router;
