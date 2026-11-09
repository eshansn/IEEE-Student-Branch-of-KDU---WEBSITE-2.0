import mongoose, { Schema, Document } from 'mongoose';

export interface IGalleryItem extends Document {
  eventName: string;
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

const GalleryItemSchema: Schema = new Schema({
  eventName: {
    type: String,
    required: [true, 'Event name is required'],
    trim: true,
    maxlength: [100, 'Event name cannot exceed 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Event description is required'],
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
    match: [/^#[0-9A-F]{6}$/i, 'Color must be a valid hex color code'],
    default: '#0066CC'
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
GalleryItemSchema.index({ year: -1 });
GalleryItemSchema.index({ eventName: 1 });
GalleryItemSchema.index({ featured: -1 });
GalleryItemSchema.index({ isActive: 1 });
GalleryItemSchema.index({ createdAt: -1 });

// Export the GalleryItem model for database operations
export default mongoose.model<IGalleryItem>('GalleryItem', GalleryItemSchema);
