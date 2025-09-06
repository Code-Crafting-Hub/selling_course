const adminModel = require("../models/admin.model");
require('dotenv').config()
const z = require('zod')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');
const { jwtAdminPassword } = require("../config");

const signup = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  try {
    if (!firstName || !lastName || !email || !password) {
      return res.json({ errors: "All fields are required" });
    }
    const adminSchema = z.object({
      firstName: z.string().min(1),
      lastName: z.string().min(1),
      email: z.string().email(),
      password: z
        .string()
        .min(6, { message: "Password should be 6 char long" }),
    });
    const validateData = adminSchema.safeParse(req.body);
    if (validateData.success) {
      return res.json({
        errors: validateData.error.issues.map((err) => err.message),
      });
    }
    const salt = 10;
    const hashedPassword = await bcrypt.hash(password, salt);
    const existingAdmin = await adminModel.findOne({ email: email });
    if (existingAdmin) {
      return res.json({ errors: "Admin already exists" });
    }
    const newAdmin = new adminModel({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });
    await newAdmin.save();
    res.json({ message: "Signup successfully" });
  } catch (error) {
    console.log("Error in admin signup ", error);
    res.json({ errors: "Internal server error" });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const admin = await adminModel.findOne({ email: email });
    const isPasswordCorrect = await bcrypt.compare(password, admin.password);
    if (!admin || !isPasswordCorrect) {
      return res.json({ errors: "Invalid Credentials" });
    }
    const token = jwt.sign({ id: admin._id }, jwtAdminPassword, {
      expiresIn: "1d",
    });
    const cookieOption = {
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
    };
    res.cookie("jwt", token, cookieOption);
    res.json({ message: "Login successfully", token });
  } catch (error) {
    console.log("Error while user login", error);
    res.json({ errors: "Internal server error" });
  }
};

const logout = async (req, res) => {
  try {
    res.clearCookie("jwt");
    res.json({ message: "Logout successfully" });
  } catch (error) {
    console.log("Error in admin logout", error);
    res.json({ errors: "Internal server error" });
  }
};

module.exports = { signup, login, logout };
