import User from "../models/user.model.js";
import mongoose from "mongoose";

const objectId = mongoose.Types.ObjectId;
//create user
export const createUser = async (user) => {
  const newUser = await User.create(user);
  return newUser;
};

export const getUserByEmail = async (email) => {
  const user = await User.findOne({ email });
  return user;
};

//Get user by id
export const getUserById = async (id) => {
  const user = await User.findById(new objectId(id));
  return user;
};

//update user
export const updateUser = async (id, user) => {
  const updatedUser = await User.findByIdAndUpdate(id, user, {
    returnDocument: "after",
  });
  return updatedUser;
};
