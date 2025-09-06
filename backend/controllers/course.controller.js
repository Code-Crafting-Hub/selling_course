const courseModel = require("../models/course.model");
const purchaseModel = require("../models/purchase.model");
const cloudinary = require("cloudinary").v2;

const createCourse = async (req, res) => {
  const { title, description, price } = req.body;
  const { image } = req.files;
  try {
    if (!title || !description || !price) {
      return res.status(400).json((errors = "All fields are required"));
    }
    if (!image || Object.keys(req.files).length === 0) {
      return res.status(400).json({ errors: "No file uploaded" });
    }

    const allowedFormat = ["image/png", "image/jpeg"];
    if (!allowedFormat.includes(image.mimetype)) {
      return res
        .status(400)
        .json({ errors: "Invalid file format. Only PNG and jpg are allowed" });
    }

    //cloudinary code

    const cloud_response = await cloudinary.uploader.upload(image.tempFilePath);

    if (!cloud_response || cloud_response.error) {
      return res
        .status(400)
        .json({ errors: "Error while upload file to cloud" });
    }

    const courseData = {
      title,
      description,
      price,
      image: {
        public_id: cloud_response.public_id,
        url: cloud_response.url,
      },
    };
    const course = await courseModel.create(courseData);
    res.json({ message: "Course created successfully", course });
  } catch (error) {
    console.log(error);
    res.json("Error in creating course");
  }
};

const updateCourse = async (req, res) => {
  const { courseId } = req.params;
  const { title, description, price } = req.body;
  try {
    const course = await courseModel.updateOne(
      { _id: courseId },
      {
        title,
        description,
        price,
      }
    );
    res.json({ message: "Course updated successfully", course });
  } catch (error) {
    console.log("Error in course updating ", error);
    res.stats(500).json({ errors: "Internal server error" });
  }
};

const deleteCourse = async (req, res) => {
  const { courseId } = req.params;
  try {
    const course = await courseModel.findByIdAndDelete({ _id: courseId });
    if (!course) {
      return res.status(404).json({ errors: "COurse not found" });
    }
    res.json({ message: "Course deleted successfully" });
  } catch (error) {
    console.log("Error in deleting course", error);
    res.json({ errors: "Internal server error" });
  }
};

const getCourses = async (req, res) => {
  try {
    const courses = await courseModel.find({});
    res.json({ courses });
  } catch (error) {
    console.log("Error in getting courses ", error);
    res.json({ errors: "Internal server error" });
  }
};

const courseDetail = async (req, res) => {
  const { courseId } = req.params;
  try {
    const course = await courseModel.findById({ courseId });
    if (!course) {
      return res.json({ errors: "Course not found" });
    }
    res.json({ course });
  } catch (error) {
    console.log("Error in getting specific course detail ", error);
    res.json({ errors: "Internal server error" });
  }
};

const buyCourses = async(req,res)=>{
  const userId = req.userId
  const {courseId} = req.params
  try {
    const course = await courseModel.findById(courseId)
    if(!course){
      return res.json({errors:"Course not found"})
    }
    const existingPurchase = await purchaseModel.findOne({userId,courseId})
    if(existingPurchase){
      return res.json({errors:"Course already purchased"})
    }
    const newPurchase = new purchaseModel({userId,courseId})
    await newPurchase.save();
    res.json({message:"Course purchase successfully"})
  } catch (error) {
    console.log("Error in buying course",error)
    res.json({errors:"Internal server error"})
  }
}

module.exports = {
  createCourse,
  updateCourse,
  deleteCourse,
  getCourses,
  courseDetail,
  buyCourses
};
