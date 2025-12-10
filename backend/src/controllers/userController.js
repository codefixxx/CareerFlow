import User from "../models/User.js";
export const getUserProfile=async(req,res)=>{
    
    try{
        const user = await req.user;

        if(!user){
            return res.status(404).json({success:false, message:"User not found"});
        }
        return res.status(200).json({success:true, message:"User profile fetched successfully", userData:{
            name:user.name,
            email:user.email,
            skills:user.skills,
            country:user.country,
            careerPaths:user.careerPaths,
            isVerified:user.isVerified
        }});
    } catch(err){
        return res.status(500).json({success:false, message:"Server error while fetching user profile", error:err.message});
    }
};