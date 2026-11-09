// API Service for connecting main website to backend
// Add this file to your main website: src/services/backendAPI.ts

import React from 'react';

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
  const isDevelopment = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
  return isDevelopment ? API_CONFIG.development : API_CONFIG.production;
};

const API_BASE_URL = getAPIBaseURL();

// Debug logging
interface ApiResponse<T> {
  data: T;
}

// API Service Class
export class BackendAPIService {
  private baseUrl: string;

  constructor(baseUrl: string = API_BASE_URL) {
    this.baseUrl = baseUrl;
  }

  // Generic fetch method
  private async fetchAPI<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
        ...options,
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.status} - ${response.statusText}`);
      }

      const data = await response.json() as T;
      return data;
    } catch (error) {
      console.error(`Failed to fetch ${endpoint}:`, error);
      throw error;
    }
  }

  // Projects API
  async getAllProjects(): Promise<BackendProject[]> {
    const response = await this.fetchAPI<ApiResponse<BackendProject[]>>('/projects');
    return response.data; // Array of projects
  }

  async getProjectById(id: string): Promise<BackendProject> {
    const response = await this.fetchAPI<ApiResponse<BackendProject>>(`/projects/${id}`);
    return response.data;
  }

  async getProjectsByStatus(status: 'Completed' | 'Ongoing' | 'Upcoming') {
    const projects = await this.getAllProjects();
    return projects.filter((project) => project.status === status);
  }

  async getProjectsByCategory(category: string) {
    const projects = await this.getAllProjects();
    return projects.filter((project) => project.category === category);
  }

  // Memories API
  async getAllMemories(): Promise<BackendMemory[]> {
    const response = await this.fetchAPI<ApiResponse<BackendMemory[]>>('/memories');
    return response.data; // Array of memories
  }

  async getFeaturedMemories() {
    const memories = await this.getAllMemories();
    return memories.filter((memory) => memory.featured);
  }

  async getMemoriesByYear(year: string) {
    const memories = await this.getAllMemories();
    return memories.filter((memory) => memory.year === year);
  }

  // Health check
  async healthCheck() {
    return this.fetchAPI<unknown>('/health');
  }
}

// Create singleton instance
export const backendAPI = new BackendAPIService();

// TypeScript interfaces matching your backend models
export interface BackendProject {
  _id: string;
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
  createdAt: string;
  updatedAt: string;
}

export interface BackendMemory {
  _id: string;
  title: string;
  description: string;
  year: string;
  event: string;
  images: string[];
  tags: string[];
  featured: boolean;
  createdAt: string;
  updatedAt: string;
}

// Helper functions for data conversion
export const convertBackendToFrontendProject = (backendProject: BackendProject) => {
  return {
    title: backendProject.title,
    year: backendProject.year,
    description: backendProject.description,
    status: backendProject.status,
    gradient: backendProject.gradient,
    category: backendProject.category,
    participants: backendProject.participants,
    images: backendProject.images,
    galleryImages: backendProject.galleryImages,
    detailedDescription: backendProject.detailedDescription,
  };
};

// React Hook for using backend projects
export const useBackendProjects = () => {
  const [projects, setProjects] = React.useState<BackendProject[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    const loadProjects = async () => {
      try {
        setLoading(true);
        const data = await backendAPI.getAllProjects();
        setProjects(data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load projects');
        console.error('Failed to load projects:', err);
      } finally {
        setLoading(false);
      }
    };

    loadProjects();
  }, []);

  const refetchProjects = async () => {
    try {
      setLoading(true);
      const data = await backendAPI.getAllProjects();
      setProjects(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load projects');
      console.error('Failed to load projects:', err);
    } finally {
      setLoading(false);
    }
  };

  return { projects, loading, error, refetch: refetchProjects };
};

// React Hook for using backend memories
export const useBackendMemories = () => {
  const [memories, setMemories] = React.useState<BackendMemory[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    const loadMemories = async () => {
      try {
        setLoading(true);
        const data = await backendAPI.getAllMemories();
        setMemories(data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load memories');
        console.error('Failed to load memories:', err);
      } finally {
        setLoading(false);
      }
    };

    loadMemories();
  }, []);

  const refetchMemories = async () => {
    try {
      setLoading(true);
      const data = await backendAPI.getAllMemories();
      setMemories(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load memories');
      console.error('Failed to load memories:', err);
    } finally {
      setLoading(false);
    }
  };

  return { memories, loading, error, refetch: refetchMemories };
};
