import CareerPath from "../models/CareerPath.js";

export const getUserCareerPaths = async (req, res) => {
  try {

    const page = parseInt(req.query.page) || 1;
    const limit = 6;
    const skip = (page - 1) * limit;

    const userCareerIds = req.user.careerPaths;

    const total = await CareerPath.countDocuments({
      _id: { $in: userCareerIds }
    });

    const careerPaths = await CareerPath.find({
      _id: { $in: userCareerIds }
    })
      .select("skills tree createdAt")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const paths = careerPaths.map((path) => ({
      careerData: {
        id: path._id,
        skills: path.skills,
        tree: path.tree,
        createdAt: path.createdAt
      }
    }));

    return res.json({
      success: true,
      page,
      totalPages: Math.ceil(total / limit),
      totalItems: total,
      careerPaths: paths
    });

  } catch (error) {

    console.error("CareerPaths fetch error:", error);

    return res.status(500).json({
      success: false,
      message: "Server error"
    });

  }
};