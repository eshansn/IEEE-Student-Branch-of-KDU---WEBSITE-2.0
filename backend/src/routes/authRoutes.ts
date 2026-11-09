import express from 'express';
import { login, register, getProfile, updateProfile, logout } from '../controllers/authController';
import { protect, authorize } from '../middleware/auth';

const router = express.Router();

// Public routes
router.post('/login', login);

// Protected routes
router.use(protect);
router.get('/profile', getProfile);
router.put('/profile', updateProfile);
router.post('/logout', logout);

// Admin only routes
router.post('/register', authorize('admin'), register);

export default router;
