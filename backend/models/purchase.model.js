const mongoose = require('mongoose')

const purchaseSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Types.ObjectId,
        ref:"userModel"
    },
    courseId:{
        type:mongoose.Types.ObjectId,
        ref:"courseModel"
    }
})

const purchaseModel = mongoose.model("purchase",purchaseSchema)

module.exports = purchaseModel