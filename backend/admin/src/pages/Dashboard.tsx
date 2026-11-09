import { useState, useEffect, type ReactNode } from 'react'
import {
  Container,
  Typography,
  Grid,
  Paper,
  Box,
  Card,
  CardContent,
  LinearProgress,
} from '@mui/material'
import {
  Work,
  Collections,
  TrendingUp,
  People,
} from '@mui/icons-material'
import axios from 'axios'
import API_BASE_URL from '../config/api'

interface Stats {
  totalProjects: number
  completedProjects: number
  ongoingProjects: number
  upcomingProjects: number
  totalGalleryItems: number
  featuredGalleryItems: number
}

interface ProjectSummary {
  status: 'Completed' | 'Ongoing' | 'Upcoming'
}

interface GallerySummary {
  featured: boolean
}

interface ApiResponse<T> {
  data: T
}

const Dashboard = () => {
  const [stats, setStats] = useState<Stats>({
    totalProjects: 0,
    completedProjects: 0,
    ongoingProjects: 0,
    upcomingProjects: 0,
    totalGalleryItems: 0,
    featuredGalleryItems: 0,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
      const authHeaders = {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      };

      const [projectsRes, galleryRes] = await Promise.all([
        axios.get<ApiResponse<ProjectSummary[]>>(`${API_BASE_URL}/projects`, authHeaders),
        axios.get<ApiResponse<GallerySummary[]>>(`${API_BASE_URL}/gallery/admin/all`, authHeaders),
      ])

      const projects = projectsRes.data.data
      const galleryItems = galleryRes.data.data

      setStats({
        totalProjects: projects.length,
        completedProjects: projects.filter((project) => project.status === 'Completed').length,
        ongoingProjects: projects.filter((project) => project.status === 'Ongoing').length,
        upcomingProjects: projects.filter((project) => project.status === 'Upcoming').length,
        totalGalleryItems: galleryItems.length,
        featuredGalleryItems: galleryItems.filter((item) => item.featured).length,
      })
    } catch (error) {
      console.error('Failed to fetch stats:', error)
    } finally {
      setLoading(false)
    }
  }

  const StatCard = ({ title, value, icon, color }: { title: string; value: number; icon: ReactNode; color: string }) => (
    <Card>
      <CardContent>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Box>
            <Typography color="textSecondary" gutterBottom>
              {title}
            </Typography>
            <Typography variant="h4" component="h2">
              {loading ? '-' : value}
            </Typography>
          </Box>
          <Box sx={{ color }}>
            {icon}
          </Box>
        </Box>
        {loading && <LinearProgress sx={{ mt: 1 }} />}
      </CardContent>
    </Card>
  )

  const completionRate = stats.totalProjects > 0 
    ? Math.round((stats.completedProjects / stats.totalProjects) * 100) 
    : 0

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" component="h1" gutterBottom>
        Dashboard
      </Typography>
      <Typography variant="body1" color="text.secondary" gutterBottom>
        Welcome to IEEE KDU Admin Panel
      </Typography>

      <Grid container spacing={3} sx={{ mt: 2 }}>
        {/* Stats Cards */}
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Total Projects"
            value={stats.totalProjects}
            icon={<Work sx={{ fontSize: 40 }} />}
            color="primary.main"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Completed Projects"
            value={stats.completedProjects}
            icon={<TrendingUp sx={{ fontSize: 40 }} />}
            color="success.main"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Ongoing Projects"
            value={stats.ongoingProjects}
            icon={<People sx={{ fontSize: 40 }} />}
            color="info.main"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Gallery Items"
            value={stats.totalGalleryItems}
            icon={<Collections sx={{ fontSize: 40 }} />}
            color="secondary.main"
          />
        </Grid>

        {/* Project Status Overview */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Project Status Overview
            </Typography>
            <Box sx={{ mt: 2 }}>
              <Typography variant="body2" gutterBottom>
                Completed: {stats.completedProjects} ({completionRate}%)
              </Typography>
              <LinearProgress 
                variant="determinate" 
                value={completionRate} 
                color="success"
                sx={{ height: 8, borderRadius: 4, mb: 2 }}
              />
              
              <Typography variant="body2" gutterBottom>
                Ongoing: {stats.ongoingProjects}
              </Typography>
              <LinearProgress 
                variant="determinate" 
                value={stats.totalProjects > 0 ? (stats.ongoingProjects / stats.totalProjects) * 100 : 0} 
                color="info"
                sx={{ height: 8, borderRadius: 4, mb: 2 }}
              />
              
              <Typography variant="body2" gutterBottom>
                Upcoming: {stats.upcomingProjects}
              </Typography>
              <LinearProgress 
                variant="determinate" 
                value={stats.totalProjects > 0 ? (stats.upcomingProjects / stats.totalProjects) * 100 : 0} 
                color="warning"
                sx={{ height: 8, borderRadius: 4 }}
              />
            </Box>
          </Paper>
        </Grid>

        {/* Quick Actions */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Quick Stats
            </Typography>
            <Box>
              <Typography variant="body2" gutterBottom>
                Total Projects: {stats.totalProjects}
              </Typography>
              <Typography variant="body2" gutterBottom>
                Gallery Items: {stats.totalGalleryItems}
              </Typography>
              <Typography variant="body2" gutterBottom>
                Featured Gallery: {stats.featuredGalleryItems}
              </Typography>
              <Typography variant="body2" gutterBottom>
                Upcoming Projects: {stats.upcomingProjects}
              </Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  )
}

export default Dashboard
