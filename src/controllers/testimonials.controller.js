import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();


const createTestimonial = async (req, res) => {
    const userId = req.userId;
    try {
      const { content } = req.body;
      
      if (!content) {
        return res.status(400).json({ error: "Please provide testimonial content" });
      }
      const user = await prisma.user.findUnique({
        where: { id: userId },
        select: { name: true }, 
      });
  
      const profile = await prisma.profile.findFirst({
        where: { userId },
      });
  
      if (!profile) {
        return res.status(404).json({ error: "Profile not found for this user" });
      }
  
      const newTestimonial = await prisma.testimonial.create({
        data: {
          content,
          authorName: user.name, // Use profile.user.name instead of user.name
          authorRole: "Common",
          profileId: profile.id,
        },
      });
  
      res.status(201).json(newTestimonial);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error", error: error.message });
    }
  };
  
  const getTestimonialsByUserId = async (req, res) => {
    const userId = req.params.userId; 
    try {
      const profile = await prisma.profile.findFirst({
        where: { userId: parseInt(userId) },
      });
  
      if (!profile) {
        return res.status(404).json({ error: "Profile not found for this user" });
      }
  
      const userTestimonials = await prisma.testimonial.findMany({
        where: {
          profileId: profile.id,
        },
      });
  
      res.status(200).json(userTestimonials);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error", error: error.message });
    }
  };
  
  

  const deleteTestimonial = async (req, res) => {
    const userId = req.user.id;
    const testimonialId = parseInt(req.params.id);
    try {
      const testimonial = await prisma.testimonial.findUnique({
        where: { id: testimonialId },
        include: { profile: true },
      });
      const currentUser = await prisma.user.findUnique({
        where: {
          id: userId,
        },
      });
  
      if (!testimonial) {
        return res.status(404).json({ error: "Testimonial not found" });
      }
  
     
      if (testimonial.profile.userId !== req.userId) {
        return res.status(403).json({ error: "Unauthorized to delete this testimonial" });
      }
  
      if (currentUser.role !== "admin") {
        return res.status(400).json({ message: "You are not authorized" });
      }
      await prisma.testimonial.delete({
        where: { id: testimonialId },
      });
  
      res.status(204).end(); 
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error", error: error.message });
    }
  };
  
  export {
    getTestimonialsByUserId,
    createTestimonial,
    deleteTestimonial
  }