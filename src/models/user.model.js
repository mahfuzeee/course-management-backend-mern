import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import loger from "../utils/logger.js";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
  },
  { timestamps: true, versionKey: false },
);

userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;

  try {
    const salt = await bcrypt.genSalt(10); // Generate salt
    this.password = await bcrypt.hash(this.password, salt); // Replace plain text with hash
  } catch (error) {
    loger.info({ err: error }, "Failed to hash password");
  }
});

const User = mongoose.model("User", userSchema);

export default User;
