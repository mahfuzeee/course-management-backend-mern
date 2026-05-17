import * as userRepository from "../repositories/user.repository.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/tokenHelper.js";

export const createUser = async (user) => {
  const existingUser = await userRepository.getUserByEmail(user.email);
  if (existingUser) {
    throw new Error("User already exists");
  }
  if (user.password.length < 6) {
    throw new Error("Password must be at least 6 characters long");
  }
  const newUser = await userRepository.createUser(user);
  return newUser;
};

//User login
export const loginUser = async (email, password) => {
  try {
    const existingUser = await userRepository.getUserByEmail(email);
    if (!existingUser) {
      throw new Error("User not found");
    }

    const isMatch = await bcrypt.compare(password, existingUser.password);

    if (!isMatch) {
      throw new Error("Invalid email or password");
    }
    const token = generateToken(
      existingUser.email,
      existingUser._id.toString(),
    );
    return { existingUser, token };
  } catch (error) {
    throw error;
  }
};

export const getUserById = async (id) => {
  const user = await userRepository.getUserById(id);
  if (!user) {
    throw new Error("User not found, please register or login");
  }
  return user;
};

export const updateUser = async (id, user) => {
  try {
    const existingUser = await userRepository.getUserById(id);
    if (!existingUser) {
      throw new Error("User not found");
    }

    const updatedUser = await userRepository.updateUser(id, user);
    const token = generateToken(updatedUser.email, updatedUser._id.toString());
    return { updatedUser, token };
  } catch (error) {
    throw error;
  }
};
