const express = require('express')
require('dotenv').config()
const app= express()

app.use('/',()=>{
    console.log("server is running")
})

module.exports = {app}