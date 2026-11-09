import { Request, Response } from 'express';
import Memory from '../models/MemoryNew';

// @desc    Get all memories
// @route   GET /api/memories
// @access  Public
export const getMemories = async (req: Request, res: Response) => {
  try {
    const memories = await Memory.find({}).sort({ createdAt: -1 });
    
    res.status(200).json({
      success: true,
      count: memories.length,
      data: memories
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};

// @desc    Get featured memories
// @route   GET /api/memories/featured
// @access  Public
export const getFeaturedMemories = async (req: Request, res: Response) => {
  try {
    const memories = await Memory.find({ featured: true }).sort({ createdAt: -1 });
    
    res.status(200).json({
      success: true,
      count: memories.length,
      data: memories
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};

// @desc    Get memories by year
// @route   GET /api/memories/year/:year
// @access  Public
export const getMemoriesByYear = async (req: Request, res: Response) => {
  try {
    const { year } = req.params;
    const memories = await Memory.find({ year }).sort({ createdAt: -1 });
    
    res.status(200).json({
      success: true,
      count: memories.length,
      data: memories
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};

// @desc    Get single memory
// @route   GET /api/memories/:id
// @access  Public
export const getMemory = async (req: Request, res: Response) => {
  try {
    const memory = await Memory.findById(req.params.id);

    if (!memory) {
      return res.status(404).json({
        success: false,
        error: 'Memory not found'
      });
    }

    res.status(200).json({
      success: true,
      data: memory
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};

// @desc    Create new memory
// @route   POST /api/memories
// @access  Private (Admin/Editor)
export const createMemory = async (req: Request, res: Response) => {
  try {
    const memory = await Memory.create(req.body);

    res.status(201).json({
      success: true,
      data: memory
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

// @desc    Update memory
// @route   PUT /api/memories/:id
// @access  Private (Admin/Editor)
export const updateMemory = async (req: Request, res: Response) => {
  try {
    const memory = await Memory.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    if (!memory) {
      return res.status(404).json({
        success: false,
        error: 'Memory not found'
      });
    }

    res.status(200).json({
      success: true,
      data: memory
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

// @desc    Delete memory
// @route   DELETE /api/memories/:id
// @access  Private (Admin)
export const deleteMemory = async (req: Request, res: Response) => {
  try {
    const memory = await Memory.findByIdAndDelete(req.params.id);

    if (!memory) {
      return res.status(404).json({
        success: false,
        error: 'Memory not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Memory deleted successfully'
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};

// @desc    Create new memory with images
// @route   POST /api/memories/with-images
// @access  Private (Admin/Editor)
export const createMemoryWithImages = async (req: any, res: Response) => {
  try {
    const memoryData = { ...req.body };
    
    // Process uploaded images with their metadata
    const images: Array<{
      url: string;
      title: string;
      size: 'small' | 'medium' | 'large' | 'wide' | 'tall';
    }> = [];

    if (req.files && req.files.length > 0) {
      req.files.forEach((file: any, index: number) => {
        const title = req.body[`imageTitle_${index}`] || file.originalname.split('.')[0];
        const size = req.body[`imageSize_${index}`] || 'medium';
        
        images.push({
          url: file.path, // Cloudinary URL
          title: title,
          size: size
        });
      });
    }
    
    // Add processed images to memory data
    memoryData.images = images;

    const memory = await Memory.create(memoryData);

    res.status(201).json({
      success: true,
      data: memory
    });
  } catch (error: any) {
    console.error('Memory creation error:', error);
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((val: any) => val.message);
      return res.status(400).json({
        success: false,
        error: messages.join('. ')
      });
    }
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};

// @desc    Update memory images
// @route   PUT /api/memories/:id/images
// @access  Private (Admin/Editor)
export const updateMemoryImages = async (req: any, res: Response) => {
  try {
    const memory = await Memory.findById(req.params.id);

    if (!memory) {
      return res.status(404).json({
        success: false,
        error: 'Memory not found'
      });
    }

    const updateData = { ...req.body };
    
    // Process uploaded images with their metadata
    const images: Array<{
      url: string;
      title: string;
      size: 'small' | 'medium' | 'large' | 'wide' | 'tall';
    }> = [];

    if (req.files && req.files.length > 0) {
      req.files.forEach((file: any, index: number) => {
        const title = req.body[`imageTitle_${index}`] || file.originalname.split('.')[0];
        const size = req.body[`imageSize_${index}`] || 'medium';
        
        images.push({
          url: file.path, // Cloudinary URL
          title: title,
          size: size
        });
      });
      
      // Replace existing images with new ones
      updateData.images = images;
    }

    const updatedMemory = await Memory.findByIdAndUpdate(
      req.params.id,
      updateData,
      {
        new: true,
        runValidators: true
      }
    );

    res.status(200).json({
      success: true,
      data: updatedMemory
    });
  } catch (error: any) {
    console.error('Memory update error:', error);
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((val: any) => val.message);
      return res.status(400).json({
        success: false,
        error: messages.join('. ')
      });
    }
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};
