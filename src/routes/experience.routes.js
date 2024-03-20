import express from 'express';
const router = express.Router();
import { authenticateToken } from '../controllers/auth.controler.js';
import { createExperience,getExperiencebyuser,deleteExperiences } from '../controllers/experience.controller.js';
router.post("/",authenticateToken,createExperience);
router.get("/:userId",getExperiencebyuser);
router.delete("/:id",authenticateToken,deleteExperiences)




export default router