import mongoose from "mongoose";

const careerPathSchema = new mongoose.Schema(
  {
    skills: { type: [String], required: true },
    skillsKey: { type: String, required: true, unique: true }, // Array of skills
    tree: { type: Object, required: true }, // AI JSON response
  },
  { timestamps: true }
);
careerPathSchema.index({ skillsKey: 1 }, { unique: true });
export default mongoose.model("CareerPath", careerPathSchema);
