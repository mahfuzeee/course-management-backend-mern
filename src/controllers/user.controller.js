import * as userService from "../services/user.service.js";
import bcrypt from "bcryptjs";

const options = {
  maxAge: process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000,
  httpOnly: false,
  sameSite: "none",
  secure: true,
};

//User registration
export const registerUser = async (req, res, next) => {
  try {
    const { name, email, password, phoneNumber } = req.body;
    if (!name || !email || !password || !phoneNumber) {
      throw new Error("All fields are required");
    }
    const user = await userService.createUser(req.body);
    res.status(201).json({
      success: true,
      message: "User created successfully",
      newUser: user,
    });
  } catch (error) {
    next(error);
  }
};

//User login
export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      throw new Error("All fields are required");
    }
    const user = await userService.loginUser(email, password.toString());
    //set Cookies
    res.cookie("u_token", user.token, options);

    //send response to frontend
    res
      .status(200)
      .json({ success: true, message: "User logged in successfully", user });
  } catch (error) {
    next(error);
  }
};

//Get user profile
export const userProfile = async (req, res, next) => {
  try {
    const id = req.headers._id;
    const user = await userService.getUserById(id);

    //send response to frontend
    res.status(200).json({
      success: true,
      message: "Entered user profile successfully",
      user,
    });
  } catch (error) {
    next(error);
  }
};

//Update user profile
export const updateProfile = async (req, res, next) => {
  try {
    const { name, email, password, phoneNumber } = req.body;
    const _id = req.headers._id;
    const updatedData = { name, email, phoneNumber };
    if (password) {
      updatedData.password = await bcrypt.hash(password, 10);
    }
    const updatedUser = await userService.updateUser(
      _id.toString(),
      updatedData,
    );

    res.cookie("u_token", updatedUser.token, options);

    res.status(200).json({
      message: "User profile updated successfully",
      updatedUser: updatedUser,
    });
  } catch (error) {
    next(error);
  }
};

//Logout user
export const logoutUser = async (req, res, next) => {
  try {
    res.clearCookie("u_token");
    res
      .status(200)
      .json({ success: true, message: "User logged out successfully" });
  } catch (error) {
    next(error);
  }
};
