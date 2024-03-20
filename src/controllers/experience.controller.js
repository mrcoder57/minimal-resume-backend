import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const createExperience = async (req, res) => {
  const userId = req.userId; 
  try {
    const { title, company, location, startDate, endDate, description } = req.body;

    if (!title || !company || !location || !startDate || !description) {
      return res.status(400).json({ error: "Please provide all required fields" });
    }

   
    const profile = await prisma.profile.findFirst({
      where: { userId },
    });

    if (!profile) {
      return res.status(404).json({ error: "Profile not found for this user" });
    }

 
    const newExperience = await prisma.experience.create({
      data: {
        title,
        company,
        location,
        startDate,
        endDate,
        description,
        profileId: profile.id,
      },
    });

    res.status(201).json(newExperience);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error", error: error.message });
  }
};

const getExperiencebyuser = async (req, res) => {
  const userId = parseInt(req.params.userId); 
 
  try {
    const userExperiences = await prisma.experience.findMany({
      where: { profile: { userId } },
    });

    res.status(200).json(userExperiences);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error", error: error.message });
  }
};


const deleteExperiences = async (req, res) => {
    const userId = req.userId;
    try {
      const experienceId = parseInt(req.params.id, 10);
    
  
      
      const currentUser = await prisma.user.findUnique({
        where: {
          id: userId,
        },
      });
  
      console.log(currentUser);
  
      if (currentUser.role !== "admin") {
        return res.status(400).json({ message: "You are not authorized" });
      }
  
      if (isNaN(experienceId)) {
        return res.status(400).json({ error: "Invalid experience ID" });
      }
  
      const deletedExperience = await prisma.experience.delete({
        where: { id: experienceId },
      });
  
      res.json(deletedExperience);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error", message: error.message });
    }
  };
  
export { createExperience, getExperiencebyuser, deleteExperiences };
