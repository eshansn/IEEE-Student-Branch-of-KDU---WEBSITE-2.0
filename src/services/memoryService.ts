import axios from 'axios';
import type { MemoryCategory } from '../types/memory';

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

const memoryApi = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const memoryService = {
  // Get all active memory categories
  getActiveMemories: async (): Promise<MemoryCategory[]> => {
    try {
      const response = await memoryApi.get('/memories');
      // Filter only active memories
      return response.data.data.filter((memory: MemoryCategory) => memory.isActive);
    } catch (error) {
      console.error('Error fetching memories:', error);
      return [];
    }
  },

  // Get featured memory categories
  getFeaturedMemories: async (): Promise<MemoryCategory[]> => {
    try {
      const response = await memoryApi.get('/memories/featured');
      return response.data.data;
    } catch (error) {
      console.error('Error fetching featured memories:', error);
      return [];
    }
  },

  // Get memories by year
  getMemoriesByYear: async (year: string): Promise<MemoryCategory[]> => {
    try {
      const response = await memoryApi.get(`/memories/year/${year}`);
      return response.data.data;
    } catch (error) {
      console.error('Error fetching memories by year:', error);
      return [];
    }
  },
};

export default memoryService;
