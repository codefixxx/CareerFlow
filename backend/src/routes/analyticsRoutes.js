import express from "express";
import { runCareerAnalytics, getLatestAnalytics } from "../controllers/analyticsController.js";
const router = express.Router();
router.post("/", runCareerAnalytics); 
router.get("/", (req, res) => {
  res.send(" Backend is running!");
});        
router.get("/latest", getLatestAnalytics);
export default router;