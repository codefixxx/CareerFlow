import bcrypt from "bcryptjs";
import User from "../models/User.js";
import jwt from "jsonwebtoken";
import { transporter } from "../config/nodemailer.js";
import crypto from "crypto";

/* =========================
   REGISTER + SEND OTP
========================= */
export const register = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({
      success: false,
      message: "Please provide name, email and password",
    });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User with this email already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const otp = String(Math.floor(100000 + Math.random() * 900000));
    const hashedOtp = await bcrypt.hash(otp, 10);

    const user = new User({
      name,
      email,
      password: hashedPassword,
      isVerified: false,
      verifyOtp: hashedOtp,
      verifyOtpExpireAt: Date.now() + 10 * 60 * 1000,
    });

    await user.save();

    await transporter.sendMail({
      from: process.env.SENDER_EMAIL,
      to: email,
      subject: "Verify your CareerFlow account",
      text: `Hi ${name},\n\nYour OTP is ${otp}. It is valid for 10 minutes.\n\nCareerFlow Team`,
    });

    return res.status(201).json({
      success: true,
      message: "OTP sent to your email",
    });

  } catch (err) {
    console.error("Registration Error:", err);
    return res.status(500).json({
      success: false,
      message: "Server error during registration",
    });
  }
};

/* =========================
   LOGIN
========================= */
export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Please provide email and password",
    });
  }

  try {
    const user = await User.findOne({ email });

    // unified error to prevent user enumeration
    if (!user) {
      return res.status(400).json({
        success: false,
        code: "INVALID_CREDENTIALS",
        message: "Invalid email or password",
      });

    }

    // check password FIRST
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        code: "INVALID_CREDENTIALS",
        message: "Invalid email or password",
      });
    }

    // now check verification
    if (!user.isVerified) {
      return res.status(403).json({
        success: false,
        code: "EMAIL_NOT_VERIFIED",
        message: "Please verify your email first",
      });
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      success: true,
      message: "Login successful",
    });

  } catch (err) {
    console.error("Login Error:", err);
    return res.status(500).json({
      success: false,
      message: "Server error during login",
    });
  }
};


/* =========================
   LOGOUT
========================= */
export const logout = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
    });

    return res.json({
      success: true,
      message: "Logout successful",
    });

  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Server error during logout",
    });
  }
};

/* =========================
    SEND OTP
========================= */

export const sendOtp = async (req, res) => {
  const { email, purpose } = req.body;

  if (!email || !purpose) {
    return res.status(400).json({
      success: false,
      message: "Email and purpose are required",
    });
  }

  if (!["verify_account", "reset_password"].includes(purpose)) {
    return res.status(400).json({
      success: false,
      message: "Invalid OTP purpose",
    });
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const otp = String(Math.floor(100000 + Math.random() * 900000));
    const hashedOtp = await bcrypt.hash(otp, 10);
    const expireTime = Date.now() + 10 * 60 * 1000;

    if (purpose === "verify_account") {
      if (user.isVerified) {
        return res.status(400).json({
          success: false,
          message: "Account already verified",
        });
      }

      user.verifyOtp = hashedOtp;
      user.verifyOtpExpireAt = expireTime;
    }

    if (purpose === "reset_password") {
      user.resetOtp = hashedOtp;
      user.resetOtpExpireAt = expireTime;
    }

    await user.save();

    await transporter.sendMail({
      from: process.env.SENDER_EMAIL,
      to: email,
      subject:
        purpose === "reset_password"
          ? "Password Reset OTP"
          : "Account Verification OTP",
      text: `Your OTP is ${otp}. It is valid for 10 minutes.`,
    });

    return res.json({
      success: true,
      message: "OTP sent successfully",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

/* =========================
    VERIFY OTP
========================= */

export const verifyOtp = async (req, res) => {
  const { email, otp, purpose } = req.body;

  if (!email || !otp || !purpose) {
    return res.status(400).json({
      success: false,
      message: "Missing required fields",
    });
  }
  if (!["verify_account", "reset_password"].includes(purpose)) {
    return res.status(400).json({
      success: false,
      message: "Invalid OTP purpose",
    });
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    let hashedOtp;
    let expiry;

    if (purpose === "verify_account") {
      hashedOtp = user.verifyOtp;
      expiry = user.verifyOtpExpireAt;
    }

    if (purpose === "reset_password") {
      hashedOtp = user.resetOtp;
      expiry = user.resetOtpExpireAt;
    }

    if (!hashedOtp || expiry < Date.now()) {
      return res.status(400).json({
        success: false,
        message: "OTP expired or not found",
      });
    }

    const isValid = await bcrypt.compare(otp, hashedOtp);

    if (!isValid) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP",
      });
    }

    // Success actions
    if (purpose === "verify_account") {
      user.isVerified = true;
      user.verifyOtp = "";
      user.verifyOtpExpireAt = 0;
      await user.save();

      return res.json({
        success: true,
        message: "OTP verified successfully",
      });
    }

    if (purpose === "reset_password") {
      const resetToken = crypto.randomBytes(32).toString("hex");

      user.resetPasswordToken = crypto
        .createHash("sha256")
        .update(resetToken)
        .digest("hex");

      user.resetPasswordTokenExpireAt = Date.now() + 10 * 60 * 1000;

      user.resetOtp = "";
      user.resetOtpExpireAt = 0;


      await user.save();

      return res.json({
        success: true,
        message: "OTP verified successfully",
        resetToken, // ✅ SEND TOKEN TO FRONTEND
      });
    }

  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Server error",

    });
  }
};


/* =========================
   AUTH CHECK
========================= */
export const isAuthenticated = async (req, res) => {
  return res.status(200).json({
    success: true,
    message: "User is authenticated",
  });
};


/* =========================
   RESET PASSWORD
========================= */
export const resetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body;

    if (!token || !newPassword) {
      return res.status(400).json({ success: false, message: "Missing fields" });
    }

    const hashedToken = crypto
      .createHash("sha256")
      .update(token)
      .digest("hex");

    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordTokenExpireAt: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ success: false, message: "Invalid or expired token" });
    }

    user.password = await bcrypt.hash(newPassword, 12);
    user.resetPasswordToken = "";
    user.resetPasswordTokenExpireAt = 0;
    user.isVerified = true; // Auto-verify on password reset
    await user.save();

    return res.status(200).json({ success: true, message: "Password reset successful" });
  } catch (err) {
    return res.status(500).json({ success: false, message: "Server error" });
  }
};
