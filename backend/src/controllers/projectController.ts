import { Request, Response } from 'express';
import Project from '../models/Project';
import { deleteCloudinaryImage, extractPublicIdFromUrl } from '../config/cloudinary';

// @desc    Get all projects
// @route   GET /api/projects
// @access  Public
export const getProjects = async (req: Request, res: Response) => {
  try {
    const projects = await Project.find({}).sort({ createdAt: -1 });
    
    res.status(200).json({
      success: true,
      count: projects.length,
      data: projects
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};

// @desc    Get projects by status
// @route   GET /api/projects/status/:status
// @access  Public
export const getProjectsByStatus = async (req: Request, res: Response) => {
  try {
    const { status } = req.params;
    const validStatuses = ['Completed', 'Ongoing', 'Upcoming'];
    
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid status. Must be Completed, Ongoing, or Upcoming'
      });
    }

    const projects = await Project.find({ status }).sort({ createdAt: -1 });
    
    res.status(200).json({
      success: true,
      count: projects.length,
      data: projects
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};

// @desc    Get single project
// @route   GET /api/projects/:id
// @access  Public
export const getProject = async (req: Request, res: Response) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({
        success: false,
        error: 'Project not found'
      });
    }

    res.status(200).json({
      success: true,
      data: project
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};

// @desc    Create new project
// @route   POST /api/projects
// @access  Private (Admin/Editor)
export const createProject = async (req: Request, res: Response) => {
  try {
    const project = await Project.create(req.body);

    res.status(201).json({
      success: true,
      data: project
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

// @desc    Update project
// @route   PUT /api/projects/:id
// @access  Private (Admin/Editor)
export const updateProject = async (req: Request, res: Response) => {
  try {
    const project = await Project.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    if (!project) {
      return res.status(404).json({
        success: false,
        error: 'Project not found'
      });
    }

    res.status(200).json({
      success: true,
      data: project
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

// @desc    Delete project
// @route   DELETE /api/projects/:id
// @access  Private (Admin)
export const deleteProject = async (req: Request, res: Response) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);

    if (!project) {
      return res.status(404).json({
        success: false,
        error: 'Project not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Project deleted successfully'
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};

// @desc    Create project with image uploads
// @route   POST /api/projects/with-images
// @access  Private (Admin/Editor)
export const createProjectWithImages = async (req: Request, res: Response) => {
  try {
    const projectData = { ...req.body };
    
    // Handle uploaded images from Cloudinary
    const files = req.files as { [fieldname: string]: Express.Multer.File[] };
    
    if (files && files.images) {
      projectData.images = files.images.map((file: Express.Multer.File) => 
        file.path // This is the Cloudinary URL
      );
    }
    
    if (files && files.galleryImages) {
      projectData.galleryImages = files.galleryImages.map((file: Express.Multer.File) => 
        file.path // This is the Cloudinary URL
      );
    }

    const project = await Project.create(projectData);

    res.status(201).json({
      success: true,
      data: project,
      message: 'Project created successfully with images uploaded to Cloudinary'
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

// @desc    Update project images
// @route   PUT /api/projects/:id/images
// @access  Private (Admin/Editor)
export const updateProjectImages = async (req: Request, res: Response) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({
        success: false,
        error: 'Project not found'
      });
    }

    const files = req.files as { [fieldname: string]: Express.Multer.File[] };
    const updateData: any = {};

    // Handle new images from Cloudinary
    if (files && files.images) {
      updateData.images = files.images.map((file: Express.Multer.File) => 
        file.path // This is the Cloudinary URL
      );
    }

    // Handle new gallery images from Cloudinary
    if (files && files.galleryImages) {
      updateData.galleryImages = files.galleryImages.map((file: Express.Multer.File) => 
        file.path // This is the Cloudinary URL
      );
    }

    const updatedProject = await Project.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      data: updatedProject,
      message: 'Project images updated successfully with Cloudinary URLs'
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};

// @desc    Delete specific project image
// @route   DELETE /api/projects/:id/images/:imageType/:imageIndex
// @access  Private (Admin/Editor)
export const deleteProjectImage = async (req: Request, res: Response) => {
  try {
    const { id, imageType, imageIndex } = req.params;
    const project = await Project.findById(id);

    if (!project) {
      return res.status(404).json({
        success: false,
        error: 'Project not found'
      });
    }

    const index = parseInt(imageIndex);
    let imageArray: string[] = [];
    let imageUrl = '';

    if (imageType === 'images' && project.images) {
      imageArray = [...project.images];
      imageUrl = imageArray[index];
      imageArray.splice(index, 1);
    } else if (imageType === 'galleryImages' && project.galleryImages) {
      imageArray = [...project.galleryImages];
      imageUrl = imageArray[index];
      imageArray.splice(index, 1);
    } else {
      return res.status(400).json({
        success: false,
        error: 'Invalid image type or index'
      });
    }

    // Delete from Cloudinary
    if (imageUrl) {
      const publicId = extractPublicIdFromUrl(imageUrl);
      if (publicId) {
        try {
          await deleteCloudinaryImage(publicId);
        } catch (error) {
          console.warn('Failed to delete image from Cloudinary:', error);
        }
      }
    }

    // Update project
    const updateData = { [imageType]: imageArray };
    const updatedProject = await Project.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      data: updatedProject,
      message: 'Image deleted successfully from Cloudinary and database'
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};
