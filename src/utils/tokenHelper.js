import "dotenv/config";
import jwt from "jsonwebtoken";

export const generateToken = (email, _id) => {
  const key = process.env.JWT_SECRET;
  const expiresIn = process.env.JWT_EXPIRES_IN;

  const payload = { email, _id };

  return jwt.sign(payload, key, { expiresIn: expiresIn });
};

export const verifyToken = (token) => {
  try {
    const key = process.env.JWT_SECRET;
    return jwt.verify(token, key);
  } catch (error) {
    return null;
  }
};
