import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import multer from 'multer';

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Create Cloudinary storage configuration
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    return {
      folder: 'ieee_kdu/projects',
      allowed_formats: ['jpg', 'jpeg', 'png', 'webp', 'gif'],
      public_id: `project_${Date.now()}_${Math.random().toString(36).substring(7)}`,
      transformation: [
        { width: 1200, height: 900, crop: 'limit', quality: 'auto:good' },
        { fetch_format: 'auto' }
      ]
    };
  },
});

// Create multer upload middleware
export const uploadProjectImages = multer({
  storage: storage,
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
