import { v2 as cloudinary } from 'cloudinary';
import { Request } from 'express';
import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Define upload options for different image types
const uploadOptions = {
  project_images: {
    folder: 'ieee_kdu/projects',
    allowed_formats: ['jpg', 'jpeg', 'png', 'webp', 'gif'],
    transformation: [
      { width: 800, height: 600, crop: 'fill', quality: 'auto' },
      { fetch_format: 'auto' }
    ],
  },
  project_gallery: {
    folder: 'ieee_kdu/projects/gallery',
    allowed_formats: ['jpg', 'jpeg', 'png', 'webp', 'gif'],
    transformation: [
      { width: 1200, height: 900, crop: 'fill', quality: 'auto' },
      { fetch_format: 'auto' }
    ],
  },
  memory_images: {
    folder: 'ieee_kdu/memories',
    allowed_formats: ['jpg', 'jpeg', 'png', 'webp', 'gif'],
    transformation: [
      { width: 1000, height: 750, crop: 'fill', quality: 'auto' },
      { fetch_format: 'auto' }
    ],
  }
};

// Create Cloudinary storage for different upload types
const createCloudinaryStorage = (uploadType: keyof typeof uploadOptions) => {
  const options = uploadOptions[uploadType];
  
  return new CloudinaryStorage({
    cloudinary: cloudinary,
    params: async (req: Request, file: Express.Multer.File) => {
      return {
        folder: options.folder,
        allowed_formats: options.allowed_formats,
        transformation: options.transformation,
        public_id: `${uploadType}_${Date.now()}_${Math.random().toString(36).substring(7)}`,
      };
    },
  });
};

// Create multer instances for different upload types
export const uploadProjectImages = multer({
  storage: createCloudinaryStorage('project_images'),
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed!'));
    }
  },
});

export const uploadProjectGallery = multer({
  storage: createCloudinaryStorage('project_gallery'),
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed!'));
    }
  },
});

export const uploadMemoryImages = multer({
  storage: createCloudinaryStorage('memory_images'),
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed!'));
    }
  },
});

// Helper functions for Cloudinary operations
export const deleteCloudinaryImage = async (publicId: string): Promise<void> => {
  try {
    await cloudinary.uploader.destroy(publicId);
    console.log(`✅ Deleted image from Cloudinary: ${publicId}`);
  } catch (error) {
    console.error(`❌ Failed to delete image from Cloudinary: ${publicId}`, error);
    throw error;
  }
};

export const getCloudinaryImageDetails = async (publicId: string) => {
  try {
    const result = await cloudinary.api.resource(publicId);
    return result;
  } catch (error) {
    console.error(`❌ Failed to get image details from Cloudinary: ${publicId}`, error);
    throw error;
  }
};

// Extract public ID from Cloudinary URL
export const extractPublicIdFromUrl = (url: string): string | null => {
  try {
    const matches = url.match(/\/v\d+\/(.+)\./);
    return matches ? matches[1] : null;
  } catch (error) {
    console.error('Failed to extract public ID from URL:', url);
    return null;
  }
};

// Generate optimized image URLs
export const generateOptimizedUrl = (publicId: string, options: {
  width?: number;
  height?: number;
  quality?: string;
  format?: string;
} = {}) => {
  return cloudinary.url(publicId, {
    width: options.width || 'auto',
    height: options.height || 'auto',
    crop: 'fill',
    quality: options.quality || 'auto',
    fetch_format: options.format || 'auto',
  });
};

export default cloudinary;
