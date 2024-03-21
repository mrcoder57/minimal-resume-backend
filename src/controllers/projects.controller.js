import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const createProject = async (req, res) => {
  const userId = req.userId;
  try {
    const { title, description, image, startDate, endDate, skills, url } =
      req.body;
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });
    const profile = await prisma.profile.findFirst({
      where: { userId },
    });

    if (!profile) {
      return res.status(404).json({ error: "Profile not found for this user" });
    }

    if (!title || !description || !startDate || !skills || !image) {
      return res
        .status(400)
        .json({ error: "Please provide all required fields" });
    }

    const newProject = await prisma.project.create({
      data: {
        title,
        description,
        image,
        startDate,
        endDate,
        skills,
        url,
        profileId: profile.id,
      },
    });

    res.status(201).json(newProject);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Internal Server Error", error: error.message });
  }
};
const getprojectbyUserId = async (req, res) => {
  const userId = parseInt(req.params.userId, 10);
  try {
    const projects = await prisma.project.findMany({
      where: {
        userId: userId,
      },
      include: { 
        User: true,
        Profile: true,
        
      },
    });

    return res.status(200).json(projects);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


const deleteProjects = async (req, res) => {
  const userId = req.userId;
  try {
    const projectId = parseInt(req.params.id);
    const currentUser = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    // console.log(currentUser);

    if (currentUser.role !== "admin") {
      return res.status(400).json({ message: "You are not authorized" });
    }

    if (isNaN(projectId)) {
      return res.status(400).json({ error: "Invalid experience ID" });
    }

    const deletedProject = await prisma.project.delete({
      where: { id: projectId },
    });

    res.json(deletedProject);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Internal Server Error", message: error.message });
  }
};

export { createProject, getprojectbyUserId, deleteProjects };
