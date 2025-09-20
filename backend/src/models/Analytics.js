import mongoose from "mongoose";

const AnalyticsSchema = new mongoose.Schema(
  {
    job_name: { type: String, required: true, index: true },
    country: { type: String, required: true, index: true },
    year: { type: Number, required: true, index: true }, // <-- new field
    data: { type: Object, required: true },
  },
  { timestamps: true }
);

// Optional: enforce uniqueness for job+country+year
AnalyticsSchema.index({ job_name: 1, country: 1, year: 1 }, { unique: true });

export default mongoose.model("Analytics", AnalyticsSchema);