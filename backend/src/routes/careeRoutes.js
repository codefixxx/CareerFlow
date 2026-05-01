import express from "express";
import { getUserCareerPaths } from "../controllers/careerFetchController.js";
import userAuth from "../middleware/userAuth.js";

const router = express.Router();

router.get("/", userAuth, getUserCareerPaths);

export default router;