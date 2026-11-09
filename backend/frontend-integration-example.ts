// API Integration Example for IEEE KDU Main Website
// Place this in your main website's utilities or services folder

const API_BASE_URL = 'http://localhost:5000/api';

// Generic fetch function with error handling
const fetchAPI = async (endpoint: string, options: RequestInit = {}) => {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }

    const data = await response.json();
    return data.data; // Extract data from API response format
  } catch (error) {
    console.error(`Failed to fetch ${endpoint}:`, error);
    throw error;
  }
};

// Project API functions
export const projectsAPI = {
  // Get all projects
  getAll: () => fetchAPI('/projects'),

  // Get projects by status
  getByStatus: (status: 'Completed' | 'Ongoing' | 'Upcoming') => 
    fetchAPI(`/projects/status/${status}`),

  // Get single project
  getById: (id: string) => fetchAPI(`/projects/${id}`),

  // Get completed projects
  getCompleted: () => fetchAPI('/projects/status/Completed'),

  // Get ongoing projects
  getOngoing: () => fetchAPI('/projects/status/Ongoing'),

  // Get upcoming projects
  getUpcoming: () => fetchAPI('/projects/status/Upcoming'),
};

// Memory API functions
export const memoriesAPI = {
  // Get all memories
  getAll: () => fetchAPI('/memories'),

  // Get featured memories
  getFeatured: () => fetchAPI('/memories/featured'),

  // Get memories by year
  getByYear: (year: string) => fetchAPI(`/memories/year/${year}`),

  // Get single memory
  getById: (id: string) => fetchAPI(`/memories/${id}`),
};

// Usage Examples in React Components:

/*
// In your Projects component
import { projectsAPI } from './utils/apiService';

const ProjectsComponent = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const allProjects = await projectsAPI.getAll();
        setProjects(allProjects);
      } catch (error) {
        console.error('Failed to load projects:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProjects();
  }, []);

  // Filter projects by status for display
  const completedProjects = projects.filter(p => p.status === 'Completed');
  const ongoingProjects = projects.filter(p => p.status === 'Ongoing');
  const upcomingProjects = projects.filter(p => p.status === 'Upcoming');

  // Your component JSX here...
};

// In your Memories/Journey component
import { memoriesAPI } from './utils/apiService';

const MemoriesComponent = () => {
  const [memories, setMemories] = useState([]);
  const [featuredMemories, setFeaturedMemories] = useState([]);

  useEffect(() => {
    const loadMemories = async () => {
      try {
        const [allMemories, featured] = await Promise.all([
          memoriesAPI.getAll(),
          memoriesAPI.getFeatured()
        ]);
        
        setMemories(allMemories);
        setFeaturedMemories(featured);
      } catch (error) {
        console.error('Failed to load memories:', error);
      }
    };

    loadMemories();
  }, []);

  // Your component JSX here...
};
*/

// TypeScript interfaces for the data structures
export interface Project {
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

export interface Memory {
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

// Utility functions for data processing
export const projectUtils = {
  // Group projects by status
  groupByStatus: (projects: Project[]) => ({
    completed: projects.filter(p => p.status === 'Completed'),
    ongoing: projects.filter(p => p.status === 'Ongoing'),
    upcoming: projects.filter(p => p.status === 'Upcoming'),
  }),

  // Group projects by year
  groupByYear: (projects: Project[]) => {
    return projects.reduce((acc, project) => {
      const year = project.year;
      if (!acc[year]) {
        acc[year] = [];
      }
      acc[year].push(project);
      return acc;
    }, {} as Record<string, Project[]>);
  },

  // Get recent projects (last 2 years)
  getRecent: (projects: Project[]) => {
    const currentYear = new Date().getFullYear();
    return projects.filter(p => 
      parseInt(p.year) >= currentYear - 1
    ).sort((a, b) => parseInt(b.year) - parseInt(a.year));
  },
};

export const memoryUtils = {
  // Group memories by year
  groupByYear: (memories: Memory[]) => {
    return memories.reduce((acc, memory) => {
      const year = memory.year;
      if (!acc[year]) {
        acc[year] = [];
      }
      acc[year].push(memory);
      return acc;
    }, {} as Record<string, Memory[]>);
  },

  // Group memories by event
  groupByEvent: (memories: Memory[]) => {
    return memories.reduce((acc, memory) => {
      const event = memory.event;
      if (!acc[event]) {
        acc[event] = [];
      }
      acc[event].push(memory);
      return acc;
    }, {} as Record<string, Memory[]>);
  },

  // Get memories with specific tags
  getByTag: (memories: Memory[], tag: string) => {
    return memories.filter(memory => 
      memory.tags.includes(tag)
    );
  },
};

// Error handling wrapper for components
export const withErrorHandling = (apiCall: () => Promise<any>) => {
  return async () => {
    try {
      return await apiCall();
    } catch (error) {
      // You can integrate with your error reporting service here
      console.error('API call failed:', error);
      
      // Return empty data or default values
      return [];
    }
  };
};
