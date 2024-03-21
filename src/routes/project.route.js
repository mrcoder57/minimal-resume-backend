import express from 'express';
const router = express.Router();
import { createProject,deleteProjects, getprojectbyUserId } from '../controllers/projects.controller.js';
import { authenticateToken } from '../controllers/auth.controler.js';
router.post('/',authenticateToken,createProject);
router.get("/:userId",getprojectbyUserId)
router.delete('/:id',authenticateToken,deleteProjects);




export default router