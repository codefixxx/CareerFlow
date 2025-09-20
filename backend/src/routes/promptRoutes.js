import express from "express";
import { runPrompt, getLatestResponse } from "../controllers/promptController.js";

const router = express.Router();

router.post("/", runPrompt);  
router.get("/", (req, res) => {
  res.send(" Backend is running!");
});           
router.get("/latest", getLatestResponse); 

export default router;
