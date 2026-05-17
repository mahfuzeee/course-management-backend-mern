import mongoose from "mongoose";

const courseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: [0, "price must be greater than 0"],
    },
    duration: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    instructorName: {
      type: String,
      required: true,
    },
    courseImage: {
      type: String,
      required: true,
    },
  },
  { timestamps: true, versionKey: false },
);

const Course = mongoose.model("Course", courseSchema);

export default Course;
