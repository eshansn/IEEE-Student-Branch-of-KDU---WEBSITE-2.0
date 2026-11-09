import { Request, Response } from 'express';
import sharp from 'sharp';
import path from 'path';
import fs from 'fs';

interface MulterFile {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  destination: string;
  filename: string;
  path: string;
  size: number;
}

interface UploadRequest {
  file?: MulterFile;
  files?: MulterFile[];
  body: any;
  params: any;
  query: any;
}

// Ensure uploads directory exists
const uploadsDir = path.join(process.cwd(), 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// @desc    Upload single image
// @route   POST /api/upload/image
// @access  Private (Admin/Editor)
export const uploadImage = async (req: any, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        error: 'No file uploaded'
      });
    }

    // Process image with Sharp (optimize and resize)
    const optimizedImagePath = path.join(
      req.file.destination,
      'optimized-' + req.file.filename
    );

    await sharp(req.file.path)
      .resize(1200, 800, {
        fit: 'inside',
        withoutEnlargement: true
      })
      .jpeg({
        quality: 85,
        progressive: true
      })
      .toFile(optimizedImagePath);

    // Delete original file
    fs.unlinkSync(req.file.path);

    // Generate URL
    const imageUrl = `/uploads/optimized-${req.file.filename}`;

    res.status(200).json({
      success: true,
      data: {
        filename: 'optimized-' + req.file.filename,
        url: imageUrl,
        size: req.file.size
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: 'Error processing image'
    });
  }
};

// @desc    Upload multiple images
// @route   POST /api/upload/images
// @access  Private (Admin/Editor)
export const uploadMultipleImages = async (req: any, res: Response) => {
  try {
    if (!req.files || !Array.isArray(req.files) || req.files.length === 0) {
      return res.status(400).json({
        success: false,
        error: 'No files uploaded'
      });
    }

    const processedImages = [];

    for (const file of req.files) {
      try {
        // Process image with Sharp
        const optimizedImagePath = path.join(
          file.destination,
          'optimized-' + file.filename
        );

        await sharp(file.path)
          .resize(1200, 800, {
            fit: 'inside',
            withoutEnlargement: true
          })
          .jpeg({
            quality: 85,
            progressive: true
          })
          .toFile(optimizedImagePath);

        // Delete original file
        fs.unlinkSync(file.path);

        // Generate URL
        const imageUrl = `/uploads/optimized-${file.filename}`;

        processedImages.push({
          filename: 'optimized-' + file.filename,
          url: imageUrl,
          size: file.size
        });
      } catch (error) {
        console.error(`Error processing file ${file.filename}:`, error);
        // Continue processing other files
      }
    }

    res.status(200).json({
      success: true,
      count: processedImages.length,
      data: processedImages
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: 'Error processing images'
    });
  }
};
