import * as courseController from "../controllers/course.controller.js";
import authVerificationUser from "../middlewares/auth.middleware.js";
import express from "express";
const router = express.Router();

router
  .route("/")
  .post(authVerificationUser, courseController.createCourse)
  .get(authVerificationUser, courseController.getAllCourses);

router
  .route("/:id")
  .get(authVerificationUser, courseController.getCourseById)
  .put(authVerificationUser, courseController.updateCourse)
  .delete(authVerificationUser, courseController.deleteCourse);

export default router;
