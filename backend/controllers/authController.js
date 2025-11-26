import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// ========================
// 📌 User Registration
// ========================
export const register = async (req, res) => {
  try {
    // Hashing the password
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    // Creating a new user
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hash,
      photo: req.body.photo,
    });

    await newUser.save();

    res.status(200).json({
      success: true,
      message: "User registered successfully",
      data: newUser,
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Registration failed",
      error: err.message,
    });
  }
};

// ========================
// 📌 User Login
// ========================
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Compare passwords
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    // Extract password and leave rest of the data
    const { password: _, role, ...rest } = user._doc;

    // Generate JWT
    const token = jwt.sign(
      { id: user._id, username: user.username, },
      process.env.JWT_SECRET,
      { expiresIn: "365d" }
    );

    // Send token in cookie and response
    res
      .cookie("accessToken", token, {
        httpOnly: true,
        expires: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000)   // 365 days 
      })
      .status(200)
      .json({
        success: true,
        message: "Login successful",
        token,
        data: { ...rest },
        role, // ⬅️ include user role separately here
      });

  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: err.message,
    });
  }
};








// https://dashboard.razorpay.com/app/website-app-settings/api-keys
// key_id,key_secret
// rzp_test_9vnHOt0ggZFQwI,GfZFkwwmN6JgABFWTYhFol6t
