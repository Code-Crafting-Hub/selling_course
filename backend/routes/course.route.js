const express = require('express')
const createCourse = require('../controllers/course.controller')

const router = express.Router()

router.post('/create',createCourse)

module.exports = router