import express from 'express';
import {
  getGalleryItems,
  getAllGalleryItems,
  getGalleryItem,
  createGalleryItem,
  updateGalleryItem,
  deleteGalleryItem,
  getGalleryItemsByYear,
  getFeaturedGalleryItems,
  createGalleryItemWithImages,
  updateGalleryItemImages
} from '../controllers/galleryController';
import { protect, authorize } from '../middleware/auth';
import { uploadMemoryImages } from '../config/cloudinary';

const router = express.Router();

// Public routes
router.get('/', getGalleryItems);
router.get('/featured', getFeaturedGalleryItems);
router.get('/year/:year', getGalleryItemsByYear);
router.get('/:id', getGalleryItem);

// Protected routes (admin/editor only)
router.use(protect);
router.get('/admin/all', authorize('admin', 'editor'), getAllGalleryItems);
router.post('/', authorize('admin', 'editor'), createGalleryItem);
router.post('/with-images', authorize('admin', 'editor'), uploadMemoryImages.array('images', 10), createGalleryItemWithImages);
router.put('/:id', authorize('admin', 'editor'), updateGalleryItem);
router.put('/:id/images', authorize('admin', 'editor'), uploadMemoryImages.array('images', 10), updateGalleryItemImages);
router.delete('/:id', authorize('admin'), deleteGalleryItem);

export default router;
