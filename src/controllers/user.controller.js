import * as userService from "../services/user.service.js";
import bcrypt from "bcryptjs";

const options = {
  maxAge: process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000,
  httpOnly: false,
  sameSite: "none",
  secure: true,
};
export const registerUser = async (req, res, next) => {
  try {
    const { name, email, password, phoneNumber } = req.body;
    if (!name || !email || !password || !phoneNumber) {
      throw new Error("All fields are required");
    }
    const user = await userService.createUser(req.body);
    res.status(201).json({
      message: "User created successfully",
      newUser: user,
    });
  } catch (error) {
    next(error);
  }
};

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
    res.status(200).json({ message: "User logged in successfully", user });
  } catch (error) {
    next(error);
  }
};

export const userProfile = async (req, res, next) => {
  try {
    const id = req.headers._id;
    const user = await userService.getUserById(id);

    //send response to frontend
    res
      .status(200)
      .json({ message: "Entered user profile successfully", user });
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
