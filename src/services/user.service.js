import userRepository from "../repositories/user.repository.js";

export const createUser = async (user) => {
  const newUser = await userRepository.createUser(user);
  return newUser;
};
