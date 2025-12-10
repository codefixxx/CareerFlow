import bcrypt from "bcryptjs";
import User from "../models/User.js";
import jwt from "jsonwebtoken";
import { transporter } from "../config/nodemailer.js";

export const register=async(req,res)=>{
    const {name,email,password}=req.body;
    if(!name || !email || !password){
        return res.status(400).json({error:"Please provide name, email and password"});
    }
    try{
        const existingUser=await User.findOne({email});
        if(existingUser){
            return res.status(400).json({error:"User with this email already exists"});
        }
        const hashedPassword=await bcrypt.hash(password,10);
        const user=new User({
            name,
            email,
            password:hashedPassword
        });
        await user.save();
        const token=jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:"7d"});
        res.cookie("token",token,{
            httpOnly:true,
            secure:process.env.NODE_ENV==="production",
            sameSite:process.env.NODE_ENV==="production"?"none":"strict",
            maxAge:7*24*60*60*1000
        });
        
        //sending welcome email 
        const mailOptions = {
            from: process.env.SENDER_EMAIL,
            to: email,
            subject: 'Welcome to CareerFlow!',
            text: `Hi ${name},\n\nThank you for registering at CareerFlow. We're excited to have you on board!\n\nBest regards,\nThe CareerFlow Team`

        };
        await transporter.sendMail(mailOptions);

        return res.status(201).json({success:true, message:"User registered successfully"});

    } catch(err){ 
        console.error("Registration Error:", err.message);
        return res.status(500).json({ error: "Server error during registration" });

    }
}

export const login=async(req,res)=>{
    const {email,password}=req.body;

    if(!email || !password){
        return res.status(400).json({error:"Please provide email and password"});
    }
    try{
        const user=await User.findOne({email});
        if(!user){
            return res.status(400).json({error:"Invalid email or password"});
        }
        const isMatch=await bcrypt.compare(password,user.password);
        if (!isMatch){ 
            return res.status(400).json({error:"Invalid email or password"});
        }
        const token=jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:"7d"});
        res.cookie("token",token,{
            httpOnly:true,
            secure:process.env.NODE_ENV==="production",
            sameSite:process.env.NODE_ENV==="production"?"none":"strict",
            maxAge:7*24*60*60*1000
        });
       return res.status(200).json({ success: true, message: "Login successful" });

    } catch(err){
        console.error("Login Error:", err.message);
        return res.status(500).json({ error: "Server error during login" });
    }

}

export const logout=async(req,res)=>{
    try{
        res.clearCookie("token",{
            httpOnly:true,
            secure:process.env.NODE_ENV==="production",
            sameSite:process.env.NODE_ENV==="production"?"none":"strict",
        });
        return res.json({success:true, message:"Logout successful"});
    } catch(err){
        console.error("Logout Error:", err.message);
        return res.status(500).json({ error: "Server error during logout" });

    }
}

export const sendVerifyOtp = async (req, res) => {
  try {
    const user = req.user; // Already available from userAuth

    if (user.isVerified) {
      return res.json({ success: false, message: "User is already verified" });
    }

    const otp = String(Math.floor(100000 + Math.random() * 900000)); // 6-digit OTP
    user.verifyOtp = otp;
    user.verifyOtpExpireAt = Date.now() + 10 * 60 * 1000; // 10 minutes
    await user.save();

    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      to: user.email,
      subject: "Account Verification OTP",
      text: `Your OTP code is: ${otp}. It is valid for 10 minutes.`
    };

    await transporter.sendMail(mailOptions);

    return res.json({ success: true, message: "OTP sent to your email" });

  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Server error during sending OTP",
      error: err.message
    });
  }
};

export const verifyEmail = async (req, res) => {
  try {
    const user = req.user;
    const { otp } = req.body;

    if (!otp) {
      return res.status(400).json({ success: false, message: "OTP is required" });
    }

    if (user.isVerified) {
      return res.json({ success: false, message: "User is already verified" });
    }

    if (!user.verifyOtp || user.verifyOtp !== otp) {
      return res.status(400).json({ success: false, message: "Invalid OTP" });
    }

    if (Date.now() > user.verifyOtpExpireAt) {
      return res.status(400).json({ success: false, message: "OTP has expired" });
    }

    user.isVerified = true;
    user.verifyOtp = "";
    user.verifyOtpExpireAt = 0;
    await user.save();

    return res.json({ success: true, message: "Email verified successfully" });

  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: err.message
    });
  }
};

export const isAuthenticated=async(req,res)=>{
    try{   
        return res.status(200).json({success:true, message:"User is authenticated"});

    } catch(err){
        return res.status(500).json({success:false, message:"Server error", error:err.message});
    }
}

export const sendResetOtp=async(req,res)=>{
    const {email}=req.body;
    if(!email){
        return res.status(400).json({success:false, message:"Please provide email"});
    }
    try{
        const user=await User.findOne({email});
        if(!user){
            return res.status(400).json({success:false, message:"User with this email does not exist"});
        }
    const otp=String(Math.floor(100000 + Math.random() * 900000)); // Generate a 6-digit OTP
    user.resetOtp=otp;
    user.resetOtpExpireAt=Date.now()+10*60*1000;
    await user.save();
    // Send OTP via email
    const mailOptions = {
        from: process.env.SENDER_EMAIL,
        to: user.email,
        subject: 'Password Reset OTP',
        text: `Your OTP for resetting your password is: ${otp}. It is valid for 10 minutes.`
    };
        await transporter.sendMail(mailOptions);
        return res.json({success:true, message:"Password reset OTP sent to your email"});
    }
    catch(err){
        return res.status(500).json({success:false, message:"Server error", error:err.message});
    }

 }

export const resetPassword=async(req,res)=>{
    const {email,otp,newPassword}=req.body;
    if(!email || !otp || !newPassword){
        return res.status(400).json({success:false, message:"Missing fields"});
    }
    try {
        const user=await User.findOne({email});
        if(!user){
            return res.status(400).json({success:false, message:"User with this email does not exist"});
        }
        if(user.resetOtp===''||user.resetOtp!==otp){
            return res.status(400).json({success:false, message:"Invalid OTP"});
        }
        if(Date.now()>user.resetOtpExpireAt){
            return res.status(400).json({success:false, message:"OTP has expired"});
        }
        const hashedPassword=await bcrypt.hash(newPassword,10);
        user.password=hashedPassword;
        user.resetOtp="";
        user.resetOtpExpireAt=0;
        await user.save();
        return res.json({success:true, message:"Password has been reset successfully"});
    } catch (err) {
        
    }

}