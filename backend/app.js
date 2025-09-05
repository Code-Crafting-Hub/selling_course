const express = require('express')
require('dotenv').config()
const app= express()
const ConnectDb = require('./database')
const courseRoute = require('./routes/course.route')

ConnectDb();

app.use('/api/v1/course', courseRoute)

module.exports = {app}