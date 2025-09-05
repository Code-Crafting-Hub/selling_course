const courseModel = require("../models/course.model")

const createCourse = async (req,res)=>{
    const {title, description, price, image} = req.body
    try {
        if(!title || !description || !price || !image){
            return res.status(400).json(errors="All fields are required")
        }

        const courseData = {
            title,description,price,image
        }
        courseModel.create(courseData)
    } catch (error) {
        console.log(error)
        res.json("Error in creating course")
    }
}

module.exports = createCourse