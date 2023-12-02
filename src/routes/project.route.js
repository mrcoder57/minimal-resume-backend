import express from 'express';
const router = express.Router();
import { createProject,getAllProjects,deleteProjects } from '../controllers/projects.controller.js';
import { authenticateToken } from '../controllers/auth.controler.js';
router.post('/',authenticateToken,createProject);
router.get("/",getAllProjects)
router.delete('/:id',authenticateToken,deleteProjects);




export default router