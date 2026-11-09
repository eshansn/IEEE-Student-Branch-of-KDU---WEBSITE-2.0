import axios from 'axios';

// API Configuration - uses environment variables or falls back to defaults
const API_CONFIG = {
  development: 'http://localhost:3000/api',
  production: 'https://kdu-ieee-backend.vercel.app/api'
};

// Get API URL from environment variable or detect environment
const getAPIBaseURL = () => {
  // First try environment variable
  if (import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL;
  }
  
  // Fallback to environment detection
  const isDevelopment = import.meta.env.DEV;
  return isDevelopment ? API_CONFIG.development : API_CONFIG.production;
};

const API_BASE_URL = getAPIBaseURL();

const galleryApi = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Gallery item interface
export interface GalleryItem {
  _id: string;
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
  createdAt: string;
  updatedAt: string;
}

export const galleryService = {
  // Get all active gallery items
  getActiveGalleryItems: async (): Promise<GalleryItem[]> => {
    try {
      const response = await galleryApi.get('/gallery');
      return response.data.data || [];
    } catch (error) {
      console.error('Error fetching gallery items:', error);
      return [];
    }
  },

  // Get featured gallery items
  getFeaturedGalleryItems: async (): Promise<GalleryItem[]> => {
    try {
      const response = await galleryApi.get('/gallery/featured');
      return response.data.data || [];
    } catch (error) {
      console.error('Error fetching featured gallery items:', error);
      return [];
    }
  },

  // Get gallery items by year
  getGalleryItemsByYear: async (year: string): Promise<GalleryItem[]> => {
    try {
      const response = await galleryApi.get(`/gallery/year/${year}`);
      return response.data.data || [];
    } catch (error) {
      console.error('Error fetching gallery items by year:', error);
      return [];
    }
  },
};

export default galleryService;
