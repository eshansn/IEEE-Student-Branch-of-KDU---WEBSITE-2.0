# IEEE KDU Backend & Admin Panel

A comprehensive backend system with admin panel for managing IEEE KDU website projects and memories/journey images.

## 🚀 Features

### Backend API
- **Authentication System** - JWT-based auth with role-based access control
- **Projects Management** - CRUD operations for projects with status tracking
- **Memories Management** - Image gallery management for IEEE KDU journey
- **Image Upload** - Optimized image processing with Sharp
- **MongoDB Integration** - Robust data storage with validation
- **Security Features** - Helmet, CORS, rate limiting, input validation

### Admin Panel
- **Modern React UI** - Material-UI components with responsive design
- **Dashboard** - Overview of projects and memories statistics
- **Projects Management** - Complete CRUD interface for projects
- **Memories Management** - Image gallery management with tagging
- **Image Upload** - Direct image upload with preview
- **User Authentication** - Secure login with session management

## 📋 Prerequisites

- Node.js (v16 or higher)
- MongoDB (v4.4 or higher)
- Git

## 🛠️ Installation & Setup

### 1. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create environment file
cp .env.example .env
```

### 2. Configure Environment Variables

Edit the `.env` file with your settings:

```env
NODE_ENV=development
PORT=5000

# Database
MONGODB_URI=mongodb://localhost:27017/kdu_ieee_db

# JWT Secret (Generate a strong secret key)
JWT_SECRET=your_super_secret_jwt_key_here_change_this_in_production

# Admin Configuration
ADMIN_EMAIL=admin@ieeekdu.org
ADMIN_PASSWORD=admin123

# CORS Origins
FRONTEND_URL=http://localhost:5173
ADMIN_URL=http://localhost:3001
```

### 3. Setup MongoDB

Make sure MongoDB is running on your system:

```bash
# For Windows (if MongoDB is installed as service)
net start MongoDB

# For macOS with Homebrew
brew services start mongodb-community

# For Linux
sudo systemctl start mongod
```

### 4. Start Backend Server

```bash
# Development mode with auto-reload
npm run dev

# Production mode
npm run build
npm start
```

The backend will be available at `http://localhost:5000`

### 5. Admin Panel Setup

```bash
# Navigate to admin directory
cd admin

# Install dependencies
npm install

# Start development server
npm run dev
```

The admin panel will be available at `http://localhost:3001`

## 🔐 Default Credentials

**Admin Login:**
- Username: `admin`
- Password: `admin123`

*Change these credentials in production!*

## 📚 API Endpoints

### Public Endpoints
- `GET /api/health` - Health check
- `GET /api/projects` - Get all projects
- `GET /api/projects/status/:status` - Get projects by status (Completed/Ongoing/Upcoming)
- `GET /api/projects/:id` - Get single project
- `GET /api/memories` - Get all memories
- `GET /api/memories/featured` - Get featured memories
- `GET /api/memories/year/:year` - Get memories by year
- `GET /api/memories/:id` - Get single memory

### Protected Endpoints (Admin/Editor)
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile
- `PUT /api/auth/profile` - Update user profile
- `POST /api/auth/logout` - User logout
- `POST /api/projects` - Create new project
- `PUT /api/projects/:id` - Update project
- `DELETE /api/projects/:id` - Delete project (Admin only)
- `POST /api/memories` - Create new memory
- `PUT /api/memories/:id` - Update memory
- `DELETE /api/memories/:id` - Delete memory (Admin only)
- `POST /api/upload/image` - Upload single image
- `POST /api/upload/images` - Upload multiple images

## 🎨 Frontend Integration

### Fetch Projects in Your Main Website

```typescript
// Example: Fetch all projects
const fetchProjects = async () => {
  try {
    const response = await fetch('http://localhost:5000/api/projects');
    const data = await response.json();
    return data.data; // Array of projects
  } catch (error) {
    console.error('Failed to fetch projects:', error);
  }
};

// Example: Fetch projects by status
const fetchOngoingProjects = async () => {
  try {
    const response = await fetch('http://localhost:5000/api/projects/status/Ongoing');
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Failed to fetch ongoing projects:', error);
  }
};

// Example: Fetch memories
const fetchMemories = async () => {
  try {
    const response = await fetch('http://localhost:5000/api/memories');
    const data = await response.json();
    return data.data; // Array of memories
  } catch (error) {
    console.error('Failed to fetch memories:', error);
  }
};
```

## 🗂️ Data Structure

### Project Schema
```typescript
interface Project {
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
  createdAt: Date;
  updatedAt: Date;
}
```

### Memory Schema
```typescript
interface Memory {
  _id: string;
  title: string;
  description: string;
  year: string;
  event: string;
  images: string[];
  tags: string[];
  featured: boolean;
  createdAt: Date;
  updatedAt: Date;
}
```

## 🚀 Deployment

### Backend Deployment
1. Set `NODE_ENV=production` in environment variables
2. Configure production MongoDB URI
3. Set secure JWT secret
4. Configure CORS origins for production domains
5. Use process manager like PM2 for production

### Admin Panel Deployment
1. Update API base URL in production build
2. Build for production: `npm run build`
3. Serve build files with web server (Nginx, Apache, etc.)

## 🔧 Customization

### Adding New Fields to Projects
1. Update the Project model in `src/models/Project.ts`
2. Update the project controller in `src/controllers/projectController.ts`
3. Update the admin form in `admin/src/pages/Projects.tsx`

### Adding New Fields to Memories
1. Update the Memory model in `src/models/Memory.ts`
2. Update the memory controller in `src/controllers/memoryController.ts`
3. Update the admin form in `admin/src/pages/Memories.tsx`

## 🛡️ Security Features

- JWT-based authentication
- Password hashing with bcrypt
- Rate limiting
- CORS protection
- Helmet security headers
- Input validation with Joi
- Role-based access control

## 📝 Development Scripts

### Backend
- `npm run dev` - Start development server with hot reload
- `npm run build` - Build TypeScript to JavaScript
- `npm start` - Start production server

### Admin Panel
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

MIT License - see LICENSE file for details

## 🆘 Support

For issues and support:
1. Check the console logs for error messages
2. Verify MongoDB connection
3. Check environment variables
4. Review API endpoint responses
5. Contact the development team

## 🔄 Updates & Maintenance

- Regularly update dependencies
- Monitor logs for errors
- Backup database regularly
- Update credentials periodically
- Review and update CORS origins
