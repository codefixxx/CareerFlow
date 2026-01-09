import express from "express";
const router = express.Router();
import { getUserProfile } from "../controllers/userController.js";
import userAuth from "../middleware/userAuth.js";

router.get("/data", userAuth, getUserProfile);

export default router;