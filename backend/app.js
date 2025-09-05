const express = require("express");
require("dotenv").config();
const app = express();
const ConnectDb = require("./database");
const courseRoute = require("./routes/course.route");
const fileUpload = require("express-fileupload");
const cloudinary = require("cloudinary").v2;
const userRoute = require("./routes/user.route");

app.use(express.json());
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.key.API_SECRET,
});

ConnectDb();

app.use("/api/v1/course", courseRoute);
app.use("api/v1/user", userRoute);

module.exports = { app };
