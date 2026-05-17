import express from "express";
import userRoutes from "./user.routes.js";
import courseRoutes from "./course.routes.js";

const router = express.Router();

router.use("/user", userRoutes);
router.use("/courses", courseRoutes);

export default router;
