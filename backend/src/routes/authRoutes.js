import express from "express";
const router = express.Router();
import { register, login, logout, sendVerifyOtp, verifyEmail, isAuthenticated, sendResetOtp, resetPassword} from "../controllers/authController.js";  
import userAuth from "../middleware/userAuth.js";
router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.post("/send-otp", userAuth, sendVerifyOtp);
router.post("/verify-account", userAuth, verifyEmail);
router.post("/is-auth", userAuth, isAuthenticated);
router.post("/sent-reset-otp",sendResetOtp)
router.post("/reset-password",resetPassword)
export default router;
