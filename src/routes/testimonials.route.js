import express from 'express';
const router = express.Router();
import { authenticateToken } from '../controllers/auth.controler.js';
import { createTestimonial, deleteTestimonial, getTestimonialsByUserId } from '../controllers/testimonials.controller.js';

router.post('/',authenticateToken,createTestimonial)
router.get('/:userId',getTestimonialsByUserId)
router.delete('/:id',authenticateToken,deleteTestimonial)

export default router