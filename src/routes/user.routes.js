import express from "express";
import * as userController from "../controllers/user.controller.js";
import authVerificationUser from "../middlewares/auth.middleware.js";
const router = express.Router();

router.post("/register", userController.registerUser);
router.post("/login", userController.loginUser);
router.get("/profile", authVerificationUser, userController.userProfile);
router.put("/profile", authVerificationUser, userController.updateProfile);
router.get("/logout", userController.logoutUser);

export default router;
