import mongoose, { Schema, Document } from 'mongoose';

export interface IProject extends Document {
  title: string;
  year: string;
  description: string;
  status: 'Completed' | 'Ongoing' | 'Upcoming';
  gradient: string;
  category: string;
  participants: string;
  images: string[];
  galleryImages: string[];
  detailedDescription: string;
  createdAt: Date;
  updatedAt: Date;
}

const ProjectSchema: Schema = new Schema({
  title: {
    type: String,
    required: [true, 'Project title is required'],
    trim: true,
    maxlength: [100, 'Title cannot exceed 100 characters']
  },
  year: {
    type: String,
    required: [true, 'Project year is required'],
    match: [/^\d{4}$/, 'Year must be a 4-digit number']
  },
  description: {
    type: String,
    required: [true, 'Project description is required'],
    trim: true,
    maxlength: [500, 'Description cannot exceed 500 characters']
  },
  status: {
    type: String,
    required: [true, 'Project status is required'],
    enum: {
      values: ['Completed', 'Ongoing', 'Upcoming'],
      message: 'Status must be either Completed, Ongoing, or Upcoming'
    }
  },
  gradient: {
    type: String,
    required: [true, 'Gradient is required'],
    trim: true
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    trim: true,
    maxlength: [50, 'Category cannot exceed 50 characters']
  },
  participants: {
    type: String,
    required: false,
    trim: true,
    maxlength: [20, 'Participants cannot exceed 20 characters']
  },
  images: [{
    type: String,
    trim: true
  }],
  galleryImages: [{
    type: String,
    trim: true
  }],
  detailedDescription: {
    type: String,
    required: [true, 'Detailed description is required'],
    trim: false,
    maxlength: [10000, 'Detailed description cannot exceed 10000 characters']
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Indexes for better performance
ProjectSchema.index({ status: 1 });
ProjectSchema.index({ year: -1 });
ProjectSchema.index({ category: 1 });
ProjectSchema.index({ createdAt: -1 });

export default mongoose.model<IProject>('Project', ProjectSchema);
