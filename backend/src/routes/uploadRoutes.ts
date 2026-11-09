import express from 'express';
import multer from 'multer';
import { uploadImage, uploadMultipleImages } from '../controllers/uploadController';
import { protect, authorize } from '../middleware/auth';

const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + '.' + file.originalname.split('.').pop());
  }
});

const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'));
    }
  }
});

// Protected routes (admin/editor only)
router.use(protect);
router.post('/image', authorize('admin', 'editor'), upload.single('image'), uploadImage);
router.post('/images', authorize('admin', 'editor'), upload.array('images', 10), uploadMultipleImages);

export default router;
