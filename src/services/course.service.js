import * as courseRepository from "../repositories/course.repository.js";

export const createCourse = async (course) => {
  const newCourse = await courseRepository.createCourse(course);
  return newCourse;
};

export const getAllCourses = async () => {
  const courses = await courseRepository.getAllCourses();
  return courses;
};

export const getCourseById = async (id) => {
  const course = await courseRepository.getCourseById(id);
  return course;
};

export const updateCourse = async (id, course) => {
  const updatedCourse = await courseRepository.updateCourse(id, course);
  return updatedCourse;
};

export const deleteCourse = async (id) => {
  const deletedCourse = await courseRepository.deleteCourse(id);
  return deletedCourse;
};
