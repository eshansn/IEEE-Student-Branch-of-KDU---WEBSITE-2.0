import mongoose, { Schema, Document } from 'mongoose';

export interface IMemory extends Document {
  categoryName: string;
  description: string;
  year: string;
  color: string;
  images: Array<{
    url: string;
    title: string;
    size: 'small' | 'medium' | 'large' | 'wide' | 'tall';
  }>;
  featured: boolean;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const MemorySchema: Schema = new Schema({
  categoryName: {
    type: String,
    required: [true, 'Category name is required'],
    trim: true,
    maxlength: [100, 'Category name cannot exceed 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Category description is required'],
    trim: true,
    maxlength: [500, 'Description cannot exceed 500 characters']
  },
  year: {
    type: String,
    required: [true, 'Year is required'],
    match: [/^\d{4}$/, 'Year must be a 4-digit number']
  },
  color: {
    type: String,
    required: [true, 'Theme color is required'],
    match: [/^#[0-9A-F]{6}$/i, 'Color must be a valid hex color code']
  },
  images: [{
    url: {
      type: String,
      required: true,
      trim: true
    },
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: [100, 'Image title cannot exceed 100 characters']
    },
    size: {
      type: String,
      required: true,
      enum: ['small', 'medium', 'large', 'wide', 'tall'],
      default: 'medium'
    }
  }],
  featured: {
    type: Boolean,
    default: false
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Indexes for better performance
MemorySchema.index({ year: -1 });
MemorySchema.index({ categoryName: 1 });
MemorySchema.index({ featured: -1 });
MemorySchema.index({ isActive: 1 });

// Create and export the model
let Memory: mongoose.Model<IMemory>;

try {
  // Try to get existing model
  Memory = mongoose.model<IMemory>('Memory');
} catch {
  // Create new model if it doesn't exist
  Memory = mongoose.model<IMemory>('Memory', MemorySchema);
}

export default Memory;
