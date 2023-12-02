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
    console.log(user.role);
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
const getAllProjects = async (req, res) => {
  try {
    const projects = await prisma.project.findMany();
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
  
      console.log(currentUser);
  
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
      res.status(500).json({ error: "Internal Server Error", message: error.message });
    }
  };
  
export { createProject ,getAllProjects,deleteProjects};
