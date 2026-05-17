import * as courseService from "../services/course.service.js";

export const createCourse = async (req, res, next) => {
  try {
    const {
      title,
      description,
      price,
      duration,
      category,
      instructorName,
      courseImage,
    } = req.body;
    if (
      !title ||
      !description ||
      !price ||
      !duration ||
      !category ||
      !instructorName ||
      !courseImage
    ) {
      throw new Error("All fields are required");
    }
    const course = await courseService.createCourse(req.body);
    res.status(201).json({
      success: true,
      message: "Course created successfully",
      course: course,
    });
  } catch (error) {
    next(error);
  }
};

export const getAllCourses = async (req, res, next) => {
  try {
    const courses = await courseService.getAllCourses();
    res.status(200).json({
      success: true,
      message: "Courses fetched successfully",
      courses: courses,
    });
  } catch (error) {
    next(error);
  }
};

export const getCourseById = async (req, res, next) => {
  try {
    const course = await courseService.getCourseById(req.params.id);
    res.status(200).json({
      success: true,
      message: "Course fetched successfully",
      course: course,
    });
  } catch (error) {
    next(error);
  }
};

export const updateCourse = async (req, res, next) => {
  try {
    const course = await courseService.updateCourse(req.params.id, req.body);
    res.status(200).json({
      success: true,
      message: "Course updated successfully",
      course: course,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteCourse = async (req, res, next) => {
  try {
    const course = await courseService.deleteCourse(req.params.id);
    res.status(200).json({
      success: true,
      message: "Course deleted successfully",
      course: course,
    });
  } catch (error) {
    next(error);
  }
};
