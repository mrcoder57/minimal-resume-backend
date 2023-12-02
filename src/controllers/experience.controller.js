import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const createExperience = async (req, res) => {
  const userId = req.userId;
  try {
    const { title, company, location, startDate, endDate, description } =
      req.body;

    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      res.status(400).json({ error: "User not found" });
    }

    if (
      !title ||
      !company ||
      !location ||
      !startDate ||
      !description ||
      user.role !== "admin"
    ) {
      return res
        .status(400)
        .json({
          error:
            "Please provide all required fields && u dont have authoristaton",
        });
    }

    const newExperience = await prisma.experience.create({
      data: {
        title,
        company,
        location,
        startDate,
        endDate,
        description,
      },
    });

    res.status(201).json(newExperience);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Internal Server Error", error: error.message });
  }
};
const getAllExperience = async (req, res) => {
  try {
    const experiences = await prisma.experience.findMany();
    res.json(experiences);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Internal Server Error", error: error.message });
  }
};

const deleteExperiences = async (req, res) => {
    const userId = req.userId;
    try {
      const experienceId = parseInt(req.params.id, 10);
    
  
      // Rename the variable to avoid conflict with Prisma's 'user' model
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
  
export { createExperience, getAllExperience, deleteExperiences };
