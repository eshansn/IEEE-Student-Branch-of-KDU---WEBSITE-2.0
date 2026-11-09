import express from 'express';
import {
  getMemories,
  getMemory,
  createMemory,
  updateMemory,
  deleteMemory,
  getMemoriesByYear,
  getFeaturedMemories,
  createMemoryWithImages,
  updateMemoryImages
} from '../controllers/memoryController';
import { protect, authorize } from '../middleware/auth';
import { uploadMemoryImages } from '../config/cloudinary';

const router = express.Router();

// Public routes
router.get('/', getMemories);
router.get('/featured', getFeaturedMemories);
router.get('/year/:year', getMemoriesByYear);
router.get('/:id', getMemory);

// Protected routes (admin/editor only)
router.use(protect);
router.post('/', authorize('admin', 'editor'), createMemory);
router.post('/with-images', authorize('admin', 'editor'), uploadMemoryImages.array('images', 10), createMemoryWithImages);
router.put('/:id', authorize('admin', 'editor'), updateMemory);
router.put('/:id/images', authorize('admin', 'editor'), uploadMemoryImages.array('images', 10), updateMemoryImages);
router.delete('/:id', authorize('admin'), deleteMemory);

export default router;
