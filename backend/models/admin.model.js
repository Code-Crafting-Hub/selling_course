const mongoose = require('mongoose')

const adminSchema = new mongoose.Schema({
    firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: Number,
    required: true,
    union:true
  },
  password:{
    type:String,
    required: true
  }
})

const adminModel = mongoose.model("admin",adminSchema)

module.exports = adminModel