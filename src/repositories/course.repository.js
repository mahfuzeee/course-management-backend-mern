import Course from "../models/course.model.js";

export const createCourse = async (course) => {
  const newCourse = await Course.create(course);
  return newCourse;
};

export const getAllCourses = async () => {
  const courses = await Course.find();
  return courses;
};

export const getCourseById = async (id) => {
  const course = await Course.findById(id);
  return course;
};

export const updateCourse = async (id, course) => {
  const updatedCourse = await Course.findByIdAndUpdate(id, course, {
    new: true,
  });
  return updatedCourse;
};

export const deleteCourse = async (id) => {
  const deletedCourse = await Course.findByIdAndDelete(id);
  return deletedCourse;
};
