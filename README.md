# 🎓 IEEE KDU Student Branch Website

Official website for the IEEE Student Branch at KDU (Kotelawala Defence University).

[![Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black)](https://vercel.com)
[![React](https://img.shields.io/badge/React-18.x-blue)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-18.x-green)](https://nodejs.org/)

---

## 📁 Project Structure

This is a monorepo containing **3 separate deployments**:

```
📦 KDU IEEE Website
├── 🌐 Main Website (React + TypeScript + Vite)
├── 🔧 Backend API (Node.js + Express + MongoDB)
└── 👨‍💼 Admin Panel (React + TypeScript + Vite)
```

### Components

1. **Main Website** - Public-facing website with information about IEEE KDU
   - Built with React, TypeScript, Vite, Material-UI
   - Features: Home, About, Events, Projects, Team, Contact

2. **Backend API** - RESTful API for content management
   - Built with Node.js, Express, MongoDB, Cloudinary
   - Features: Authentication, Gallery, Projects, Memories, Contact forms

3. **Admin Panel** - Content management dashboard
   - Built with React, TypeScript, Vite, Material-UI
   - Features: Gallery management, Project management, Content editing

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- Git
- Vercel CLI: `npm install -g vercel`

### Installation

```powershell
# Clone the repository
git clone https://github.com/YOUR_USERNAME/kdu-ieee-website.git
cd kdu-ieee-website

# Install dependencies for all projects
npm install
cd backend && npm install
cd admin && npm install
cd ../..
```

### Environment Setup

Create environment files from examples:
```powershell
copy .env.example .env.production
copy backend\.env.example backend\.env
copy backend\admin\.env.example backend\admin\.env.production
```

Then edit each `.env` file with your credentials. See [DEPLOYMENT.md](DEPLOYMENT.md) for details.

### Local Development

```powershell
# Main website (http://localhost:5173)
npm run dev

# Backend API (http://localhost:5000)
cd backend
npm run dev

# Admin panel (http://localhost:3001)
cd backend/admin
npm run dev
```

---

## 🌐 Deployment

### Quick Deploy (All 3 Projects)
```powershell
.\deploy-all.bat main "Your commit message" "Your Name" "you@email.com"
```

### Individual Deployment
```powershell
# Main site
.\vercel-deploy-main.bat

# Backend
cd backend
.\vercel-deploy-backend.bat

# Admin
cd backend\admin
.\vercel-deploy-admin.bat
```

### 📚 Documentation
- **[DEPLOYMENT.md](DEPLOYMENT.md)** - Complete deployment guide
- **[QUICK-REFERENCE.md](QUICK-REFERENCE.md)** - Quick command reference

---

## 🛠️ Tech Stack

### Frontend (Main + Admin)
- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Material-UI** - Component library
- **React Router** - Routing
- **Axios** - HTTP client

### Backend
- **Node.js** - Runtime
- **Express** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **Cloudinary** - Image hosting
- **Multer** - File uploads

### Deployment
- **Vercel** - Hosting & CI/CD
- **GitHub** - Version control

---

## 📝 Available Scripts

### Main Website
```powershell
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

### Backend
```powershell
npm run dev          # Start development server with nodemon
npm run build        # Compile TypeScript
npm start            # Start production server
npm run seed         # Seed database with sample data
```

### Admin Panel
```powershell
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
```

---

## 🔐 Environment Variables

### Main Site
- `VITE_API_URL` - Backend API URL

### Backend
- `MONGODB_URI` - MongoDB connection string
- `JWT_SECRET` - JWT signing secret
- `CLOUDINARY_CLOUD_NAME` - Cloudinary cloud name
- `CLOUDINARY_API_KEY` - Cloudinary API key
- `CLOUDINARY_API_SECRET` - Cloudinary API secret
- `ADMIN_EMAIL` - Default admin email
- `ADMIN_PASSWORD` - Default admin password
- `FRONTEND_URL` - Main website URL (for CORS)
- `ADMIN_URL` - Admin panel URL (for CORS)

### Admin Panel
- `VITE_API_URL` - Backend API URL

---

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

---

## 📄 License

This project is part of the IEEE KDU Student Branch.

---

## 👥 Team

Developed and maintained by the IEEE KDU Student Branch Technical Team.

---

## 📞 Support

For issues or questions:
- Open an issue on GitHub
- Contact: IEEE KDU Student Branch
- Website: [Your deployed website URL]

---

## 🙏 Acknowledgments

- IEEE for supporting student branches
- KDU for hosting the student branch
- All contributors and members

---

*Built with ❤️ by IEEE KDU Technical Team*
