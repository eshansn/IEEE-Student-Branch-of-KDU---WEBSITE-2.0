import { VercelRequest, VercelResponse } from '@vercel/node';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';

// Import routes
import authRoutes from '../src/routes/auth';
import projectRoutes from '../src/routes/projects';
import memoryRoutes from '../src/routes/memories';
import { connectDB } from '../src/config/database';
import { initializeCloudinary } from '../src/config/cloudinary';

// Load environment variables
dotenv.config();

// Initialize the Express app
const app = express();

// Security middleware
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" }
}));
app.use(compression());

// CORS configuration
app.use(cors({
  origin: [
    'http://localhost:5173',
    'http://localhost:3000',
    'http://localhost:3001',
    'http://localhost:3002',
    'https://ieee.kdu.ac.lk',
    'https://kdu-ieee-admin-r4riexp8f-kdu-ieee-sbs-projects-739f55ae.vercel.app',
    // Allow all Vercel deployment URLs and KDU domains
    /.*\.vercel\.app$/,
    /.*\.kdu\.ac\.lk$/
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.'
});
app.use('/api/', limiter);

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Initialize database and Cloudinary
let isInitialized = false;

async function initializeServices() {
  if (!isInitialized) {
    try {
      await connectDB();
      await initializeCloudinary();
      isInitialized = true;
      console.log('Services initialized successfully');
    } catch (error) {
      console.error('Failed to initialize services:', error);
      throw error;
    }
  }
}

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/memories', memoryRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Root route
app.get('/api', (req, res) => {
  res.json({ 
    message: 'KDU IEEE Backend API',
    version: '1.0.0',
    status: 'Running'
  });
});

// Error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Error:', err);
  res.status(500).json({ 
    success: false, 
    message: 'Internal server error' 
  });
});

// Export the Express app as a Vercel function
export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    await initializeServices();
    return app(req, res);
  } catch (error) {
    console.error('Handler error:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Failed to initialize services' 
    });
  }
}
