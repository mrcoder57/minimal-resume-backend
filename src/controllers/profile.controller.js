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
      where: { userId },
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
        const profile = await prisma.profile.findFirst({
            where: { userId },
        });

        if (!profile) {
            return res.status(404).json({ error: "Profile not found for this user" });
        }

        return res.status(200).json({ profileId: profile.id,profile });
    } catch (error) {
        
        return res.status(500).json({ error: "An error occurred while fetching the profile",error });
    }
};

  

  export {
    createUserProfile,
    getProfileByUserId
  }
  