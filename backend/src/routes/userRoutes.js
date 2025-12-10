import express from "express";
const router = express.Router();
import { getUserProfile } from "../controllers/userController.js";
import userAuth from "../middleware/userAuth.js";

router.post("/profile", userAuth, getUserProfile);

export default router;