import express from 'express';
const router = express.Router();
import { registerUser,loginUser } from '../controllers/user.controllers.js';


router.post('/login', loginUser);

router.post('/register', registerUser);

export default router;