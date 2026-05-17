import User from "../models/user.model.js";

export const createUser = async (user) => {
  const newUser = await User.create(user);
  return newUser;
};

export const getUserByEmail = async (email) => {
  const user = await User.findOne({ email });
  return user;
};

export const getUserById = async (id) => {
  const user = await User.findById(id);
  return user;
};
