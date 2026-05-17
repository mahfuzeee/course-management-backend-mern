import * as courseService from "../services/course.service.js";

export const createCourse = async (req, res, next) => {
  try {
    const course = await courseService.createCourse(req.body);
    res.status(201).json(course);
  } catch (error) {
    next(error);
  }
};

export const getAllCourses = async (req, res, next) => {
  try {
    const courses = await courseService.getAllCourses();
    res.status(200).json(courses);
  } catch (error) {
    next(error);
  }
};

export const getCourseById = async (req, res, next) => {
  try {
    const course = await courseService.getCourseById(req.params.id);
    res.status(200).json(course);
  } catch (error) {
    next(error);
  }
};

export const updateCourse = async (req, res, next) => {
  try {
    const course = await courseService.updateCourse(req.params.id, req.body);
    res.status(200).json(course);
  } catch (error) {
    next(error);
  }
};

export const deleteCourse = async (req, res, next) => {
  try {
    const course = await courseService.deleteCourse(req.params.id);
    res.status(200).json(course);
  } catch (error) {
    next(error);
  }
};
