import express from 'express';
import {
  getProjects,
  getProject,
  createProject,
  updateProject,
  deleteProject,
  getProjectsByStatus,
  createProjectWithImages,
  updateProjectImages,
  deleteProjectImage
} from '../controllers/projectController';
import { protect, authorize } from '../middleware/auth';
import { uploadProjectImages } from '../config/cloudinary';

const router = express.Router();

// Public routes
router.get('/', getProjects);
router.get('/status/:status', getProjectsByStatus);
router.get('/:id', getProject);

// Protected routes (admin/editor only)
router.use(protect);
router.post('/', authorize('admin', 'editor'), createProject);
router.put('/:id', authorize('admin', 'editor'), updateProject);
router.delete('/:id', authorize('admin'), deleteProject);

// Image upload routes with Cloudinary
router.post('/with-images', 
  authorize('admin', 'editor'), 
  uploadProjectImages.fields([
    { name: 'images', maxCount: 5 },
    { name: 'galleryImages', maxCount: 10 }
  ]), 
  createProjectWithImages
);

router.put('/:id/images', 
  authorize('admin', 'editor'), 
  uploadProjectImages.fields([
    { name: 'images', maxCount: 5 },
    { name: 'galleryImages', maxCount: 10 }
  ]), 
  updateProjectImages
);

router.delete('/:id/images/:imageType/:imageIndex', 
  authorize('admin', 'editor'), 
  deleteProjectImage
);

export default router;
