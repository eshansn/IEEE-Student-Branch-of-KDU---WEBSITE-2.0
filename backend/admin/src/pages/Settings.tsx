import { useState } from 'react'
import {
  Container,
  Typography,
  Paper,
  Box,
  TextField,
  Button,
  Grid,
  Alert,
  Card,
  CardContent,
} from '@mui/material'
import { Save, Upload } from '@mui/icons-material'
import { toast } from 'react-toastify'
import { useAuth } from '../contexts/AuthContext'
import axios from 'axios'

const getErrorMessage = (error: unknown, fallback: string) => (
  axios.isAxiosError<{ error?: string }>(error)
    ? error.response?.data?.error || fallback
    : fallback
)

const Settings = () => {
  const { user } = useAuth()
  const [profileData, setProfileData] = useState({
    username: user?.username || '',
    email: user?.email || '',
  })
  const [uploading, setUploading] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  const handleProfileUpdate = async () => {
    try {
      await axios.put('/auth/profile', profileData)
      toast.success('Profile updated successfully')
    } catch (error: unknown) {
      toast.error(getErrorMessage(error, 'Update failed'))
    }
  }

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setSelectedFile(file)
    }
  }

  const handleFileUpload = async () => {
    if (!selectedFile) {
      toast.error('Please select a file first')
      return
    }

    const formData = new FormData()
    formData.append('image', selectedFile)

    setUploading(true)
    try {
      const response = await axios.post('/upload/image', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      
      const imageUrl = response.data.data.url
      toast.success(`Image uploaded successfully! URL: ${imageUrl}`)
      setSelectedFile(null)
      
      // Clear the input
      const input = document.getElementById('file-upload') as HTMLInputElement
      if (input) input.value = ''
    } catch (error: unknown) {
      toast.error(getErrorMessage(error, 'Upload failed'))
    } finally {
      setUploading(false)
    }
  }

  return (
    <Container maxWidth="md">
      <Typography variant="h4" component="h1" gutterBottom>
        Settings
      </Typography>

      {/* Profile Settings */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Profile Settings
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Username"
              value={profileData.username}
              onChange={(e) => setProfileData({ ...profileData, username: e.target.value })}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Email"
              type="email"
              value={profileData.email}
              onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              startIcon={<Save />}
              onClick={handleProfileUpdate}
            >
              Update Profile
            </Button>
          </Grid>
        </Grid>
      </Paper>

      {/* Image Upload */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Image Upload
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          Upload images for projects and memories. Supported formats: JPG, PNG, GIF
        </Typography>
        
        <Box sx={{ mt: 2 }}>
          <input
            accept="image/*"
            style={{ display: 'none' }}
            id="file-upload"
            type="file"
            onChange={handleFileSelect}
          />
          <label htmlFor="file-upload">
            <Button variant="outlined" component="span" sx={{ mr: 2 }}>
              Select Image
            </Button>
          </label>
          
          {selectedFile && (
            <Typography variant="body2" component="span" sx={{ mr: 2 }}>
              Selected: {selectedFile.name}
            </Typography>
          )}
          
          <Button
            variant="contained"
            startIcon={<Upload />}
            onClick={handleFileUpload}
            disabled={!selectedFile || uploading}
          >
            {uploading ? 'Uploading...' : 'Upload'}
          </Button>
        </Box>
      </Paper>

      {/* API Information */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          API Information
        </Typography>
        
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="subtitle2" gutterBottom>
                  Backend API Endpoints:
                </Typography>
                <Typography variant="body2" component="div">
                  • GET /api/projects - Get all projects<br/>
                  • GET /api/projects/status/:status - Get projects by status<br/>
                  • GET /api/memories - Get all memories<br/>
                  • GET /api/memories/featured - Get featured memories<br/>
                  • POST /api/upload/image - Upload single image<br/>
                  • POST /api/upload/images - Upload multiple images
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Alert severity="info" sx={{ mt: 2 }}>
          <Typography variant="body2">
            <strong>Frontend Integration:</strong> Use these endpoints in your main website to fetch projects and memories data.
          </Typography>
        </Alert>
      </Paper>

      {/* User Information */}
      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>
          Current User
        </Typography>
        <Typography variant="body2" gutterBottom>
          <strong>Username:</strong> {user?.username}
        </Typography>
        <Typography variant="body2" gutterBottom>
          <strong>Email:</strong> {user?.email}
        </Typography>
        <Typography variant="body2" gutterBottom>
          <strong>Role:</strong> {user?.role}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <strong>Last Login:</strong> {user?.lastLogin ? new Date(user.lastLogin).toLocaleString() : 'N/A'}
        </Typography>
      </Paper>
    </Container>
  )
}

export default Settings
