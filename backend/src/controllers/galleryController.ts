import { Request, Response } from 'express';
import GalleryItem from '../models/GalleryItem';

// @desc    Get all gallery items
// @route   GET /api/gallery
// @access  Public
export const getGalleryItems = async (req: Request, res: Response) => {
  try {
    const galleryItems = await GalleryItem.find({ isActive: true }).sort({ createdAt: -1 });
    
    res.status(200).json({
      success: true,
      count: galleryItems.length,
      data: galleryItems
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};

// @desc    Get all gallery items (admin)
// @route   GET /api/gallery/admin
// @access  Private (Admin)
export const getAllGalleryItems = async (req: Request, res: Response) => {
  try {
    const galleryItems = await GalleryItem.find({}).sort({ createdAt: -1 });
    
    res.status(200).json({
      success: true,
      count: galleryItems.length,
      data: galleryItems
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};

// @desc    Get featured gallery items
// @route   GET /api/gallery/featured
// @access  Public
export const getFeaturedGalleryItems = async (req: Request, res: Response) => {
  try {
    const galleryItems = await GalleryItem.find({ featured: true, isActive: true }).sort({ createdAt: -1 });
    
    res.status(200).json({
      success: true,
      count: galleryItems.length,
      data: galleryItems
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};

// @desc    Get gallery items by year
// @route   GET /api/gallery/year/:year
// @access  Public
export const getGalleryItemsByYear = async (req: Request, res: Response) => {
  try {
    const { year } = req.params;
    const galleryItems = await GalleryItem.find({ year, isActive: true }).sort({ createdAt: -1 });
    
    res.status(200).json({
      success: true,
      count: galleryItems.length,
      data: galleryItems
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};

// @desc    Get single gallery item
// @route   GET /api/gallery/:id
// @access  Public
export const getGalleryItem = async (req: Request, res: Response) => {
  try {
    const galleryItem = await GalleryItem.findById(req.params.id);

    if (!galleryItem) {
      return res.status(404).json({
        success: false,
        error: 'Gallery item not found'
      });
    }

    res.status(200).json({
      success: true,
      data: galleryItem
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};

// @desc    Create new gallery item
// @route   POST /api/gallery
// @access  Private (Admin/Editor)
export const createGalleryItem = async (req: Request, res: Response) => {
  try {
    const galleryItem = await GalleryItem.create(req.body);

    res.status(201).json({
      success: true,
      data: galleryItem
    });
  } catch (error) {
    console.error(error);
    if (error instanceof Error && error.name === 'ValidationError') {
      return res.status(400).json({
        success: false,
        error: error.message
      });
    }
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};

// @desc    Update gallery item
// @route   PUT /api/gallery/:id
// @access  Private (Admin/Editor)
export const updateGalleryItem = async (req: Request, res: Response) => {
  try {
    const galleryItem = await GalleryItem.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    if (!galleryItem) {
      return res.status(404).json({
        success: false,
        error: 'Gallery item not found'
      });
    }

    res.status(200).json({
      success: true,
      data: galleryItem
    });
  } catch (error) {
    console.error(error);
    if (error instanceof Error && error.name === 'ValidationError') {
      return res.status(400).json({
        success: false,
        error: error.message
      });
    }
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};

// @desc    Delete gallery item
// @route   DELETE /api/gallery/:id
// @access  Private (Admin)
export const deleteGalleryItem = async (req: Request, res: Response) => {
  try {
    const galleryItem = await GalleryItem.findByIdAndDelete(req.params.id);

    if (!galleryItem) {
      return res.status(404).json({
        success: false,
        error: 'Gallery item not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Gallery item deleted successfully'
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};

// @desc    Create gallery item with images
// @route   POST /api/gallery/with-images
// @access  Private (Admin/Editor)
export const createGalleryItemWithImages = async (req: any, res: Response) => {
  try {
    const galleryData = { ...req.body };
    
    // Process uploaded images with their metadata
    const images: Array<{
      url: string;
      title: string;
      size: 'small' | 'medium' | 'large' | 'wide' | 'tall';
    }> = [];

    if (req.files && req.files.length > 0) {
      req.files.forEach((file: any, index: number) => {
        const imageTitle = req.body[`imageTitle_${index}`] || `Image ${index + 1}`;
        const imageSize = req.body[`imageSize_${index}`] || 'medium';
        
        images.push({
          url: file.path, // Cloudinary URL
          title: imageTitle,
          size: imageSize as 'small' | 'medium' | 'large' | 'wide' | 'tall'
        });
      });
    }

    galleryData.images = images;
    const galleryItem = await GalleryItem.create(galleryData);

    res.status(201).json({
      success: true,
      data: galleryItem
    });
  } catch (error) {
    console.error(error);
    if (error instanceof Error && error.name === 'ValidationError') {
      return res.status(400).json({
        success: false,
        error: error.message
      });
    }
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};

// @desc    Update gallery item images
// @route   PUT /api/gallery/:id/images
// @access  Private (Admin/Editor)
export const updateGalleryItemImages = async (req: any, res: Response) => {
  try {
    const galleryItem = await GalleryItem.findById(req.params.id);

    if (!galleryItem) {
      return res.status(404).json({
        success: false,
        error: 'Gallery item not found'
      });
    }

    // Process new uploaded images
    const newImages: Array<{
      url: string;
      title: string;
      size: 'small' | 'medium' | 'large' | 'wide' | 'tall';
    }> = [];

    if (req.files && req.files.length > 0) {
      req.files.forEach((file: any, index: number) => {
        const imageTitle = req.body[`imageTitle_${index}`] || `Image ${index + 1}`;
        const imageSize = req.body[`imageSize_${index}`] || 'medium';
        
        newImages.push({
          url: file.path, // Cloudinary URL
          title: imageTitle,
          size: imageSize as 'small' | 'medium' | 'large' | 'wide' | 'tall'
        });
      });
    }

    // Append new images to existing ones or replace based on request
    const replaceAll = req.body.replaceAll === 'true';
    if (replaceAll) {
      galleryItem.images = newImages;
    } else {
      galleryItem.images.push(...newImages);
    }

    await galleryItem.save();

    res.status(200).json({
      success: true,
      data: galleryItem
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};
