import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import promptRoutes from "./src/routes/promptRoutes.js";
import connectDB from "./src/config/db.js";
import cors from "cors";
import analyticsRoutes from "./src/routes/analyticsRoutes.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

app.use(cors({
  origin: "https://flowcareer.netlify.app", 
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));
// Routes
app.use("/api/prompt", promptRoutes);
app.use("/api/analytics", analyticsRoutes); // New analytics route
app.get("/", (req, res) => {
  res.send("CareerFlow Backend is running!");
});
// MongoDB connection
  connectDB().then(() => {

    app.listen(process.env.PORT || 5000, () => {
      console.log(`🚀 Server running on port ${process.env.PORT || 5000}`);
    });
  })
  