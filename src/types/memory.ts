// Memory/Event category type to match the backend
export interface MemoryCategory {
  _id: string;
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
  createdAt: string;
  updatedAt: string;
}

// Converted image type for the gallery component
export interface ImageItem {
  id: string;
  title: string;
  image: string;
  size: string;
  categoryId: string;
}

// Event category for the gallery component
export interface EventCategory {
  name: string;
  color: string;
  images: ImageItem[];
}
