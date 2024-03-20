import express from 'express';


import { createUserProfile, getProfileByUserId } from '../controllers/profile.controller.js';
import { authenticateToken } from '../controllers/auth.controler.js';
const router = express.Router();

router.post('/',authenticateToken,createUserProfile);

router.get('/:userId', getProfileByUserId);

export default router