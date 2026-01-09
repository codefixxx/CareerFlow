import User from "../models/User.js";
export const getUserProfile = (req, res) => {
    const { name, email, skills, country, careerPaths, isVerified } = req.user;

    return res.status(200).json({
        success: true,
        user: { name, email, skills, country, careerPaths, isVerified }
    });
};
