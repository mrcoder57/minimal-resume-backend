import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const createUserProfile = async (req, res) => {
  const userId = req.userId;
  try {
    const { bio, linkedin, twitter, profilePic, skills, education, name, overview } = req.body;

    if (!bio && !linkedin) {
      return res.status(400).json({ error: "Please provide bio or linkedin or both" });
    }

    const existingProfile = await prisma.profile.findUnique({
      where: {
        userId: userId 
      }
    });

    if (existingProfile) {
      return res.status(400).json({ error: "Profile already exists for this user" });
    }

    const newProfile = await prisma.profile.create({
      data: {
        bio,
        linkedin,
        twitter,
        profilePic,
        skills, 
        education, 
        name, 
        overview, 
        userId,
      },
    });

    return res.status(201).json(newProfile);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error", message: error.message });
  }
};



const getProfileByUserId = async (req, res) => {
  const userId = parseInt(req.params.userId, 10); 
  try {
      const profiles = await prisma.profile.findMany({
          where: { userId },

          
      });

      if (!profiles || profiles.length === 0) {
          return res.status(404).json({ error: "Profiles not found for this user" });
      }

      return res.status(200).json({ profiles });
  } catch (error) {
      return res.status(500).json({ error: "An error occurred while fetching the profiles", error });
  }
};

  

  export {
    createUserProfile,
    getProfileByUserId
  }
  