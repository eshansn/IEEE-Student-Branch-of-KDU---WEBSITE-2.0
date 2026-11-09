import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import multer from 'multer';

// Initialize cloudinary configuration function (called after env is loaded)
export const initializeCloudinary = () => {
  console.log('🔧 Initializing Cloudinary...');
  console.log('CLOUDINARY_CLOUD_NAME:', process.env.CLOUDINARY_CLOUD_NAME);
  console.log('CLOUDINARY_API_KEY:', process.env.CLOUDINARY_API_KEY ? '***PRESENT***' : 'MISSING');
  console.log('CLOUDINARY_API_SECRET:', process.env.CLOUDINARY_API_SECRET ? '***PRESENT***' : 'MISSING');

  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

  // Verify configuration
  try {
    const config = cloudinary.config();
    console.log('✅ Cloudinary configured successfully with cloud_name:', config.cloud_name);
    return true;
  } catch (error) {
    console.error('❌ Cloudinary configuration error:', error);
    return false;
  }
};

// Lazy initialization of CloudinaryStorage
let cloudinaryStorage: CloudinaryStorage | null = null;

export const getCloudinaryStorage = (folder: string = 'ieee_kdu/projects', prefix: string = 'project') => {
  // Initialize cloudinary if not done already
  if (!cloudinary.config().cloud_name) {
    initializeCloudinary();
  }
  
  return new CloudinaryStorage({
    cloudinary: cloudinary,
    params: async (req, file) => {
      return {
        folder: folder,
        allowed_formats: ['jpg', 'jpeg', 'png', 'webp', 'gif'],
        public_id: `${prefix}_${Date.now()}_${Math.random().toString(36).substring(7)}`,
        transformation: [
          { width: 1200, height: 900, crop: 'limit', quality: 'auto:good' },
          { fetch_format: 'auto' }
        ]
      };
    },
  });
};

// Create multer upload middleware for projects (legacy support)
export const uploadProjectImages = multer({
  storage: getCloudinaryStorage('ieee_kdu/projects', 'project'),
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

// Create multer upload middleware for memories
export const uploadMemoryImages = multer({
  storage: getCloudinaryStorage('ieee_kdu/memories', 'memory'),
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

export const uploadToCloudinary = async (
  fileBuffer: Buffer,
  options: {
    folder: string;
    transformation?: any[];
    public_id?: string;
  }
): Promise<any> => {
  try {
    return new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        {
          folder: options.folder,
          transformation: options.transformation,
          public_id: options.public_id,
        },
        (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        }
      ).end(fileBuffer);
    });
  } catch (error) {
    console.error('Failed to upload to Cloudinary:', error);
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

export default cloudinary;
