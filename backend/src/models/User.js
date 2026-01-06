import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    verifyOtp: { type: String, default: "" },
    verifyOtpExpireAt: { type: Number, default: 0 },
    isVerified: { type: Boolean, default: false },
    resetOtp: { type: String, default: "" },
    resetOtpExpireAt: { type: Number, default: 0 },
    resetPasswordToken: { type: String, default: "" },
    resetPasswordTokenExpireAt: { type: Number, default: 0 },
    skills: { type: [String], default: [] },
    country: { type: String, default: "" },


    careerPaths: [
      { type: mongoose.Schema.Types.ObjectId, ref: "CareerPath" }
    ]
  },
  { timestamps: true }
);

export default mongoose.models.User|| mongoose.model("User", userSchema);
 

