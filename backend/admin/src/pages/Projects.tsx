import { useState, useEffect } from 'react'
import {
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  CardActions,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Box,
  IconButton,
  Alert,
  Input,
  FormControl,
  FormLabel,
  Avatar,
  Stack,
} from '@mui/material'
import { Add, Edit, Delete, CloudUpload, Close } from '@mui/icons-material'
import { toast } from 'react-toastify'
import axios from 'axios'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'

interface Project {
  _id: string
  title: string
  year: string
  description: string
  status: 'Completed' | 'Ongoing' | 'Upcoming'
  gradient: string
  category: string
  participants: string
  images: string[]
  detailedDescription: string
  createdAt: string
  updatedAt: string
}

interface ProjectFormData {
  title: string
  year: string
  description: string
  status: Project['status']
  gradient: string
  category: string
  participants: string
  images: string[]
  detailedDescription: string
}

type EditableProjectField = Exclude<keyof ProjectFormData, 'images'>

const getErrorMessage = (error: unknown, fallback: string) => (
  axios.isAxiosError<{ error?: string }>(error)
    ? error.response?.data?.error || fallback
    : fallback
)

const Projects = () => {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingProject, setEditingProject] = useState<Project | null>(null)
  const [formData, setFormData] = useState<ProjectFormData>({
    title: '',
    year: new Date().getFullYear().toString(),
    description: '',
    status: 'Upcoming' as 'Completed' | 'Ongoing' | 'Upcoming',
    gradient: '',
    category: '',
    participants: '',
    images: [] as string[],
    detailedDescription: '',
  })
  const [selectedImages, setSelectedImages] = useState<File[]>([])
  const [uploading, setUploading] = useState(false)
  const [gradientColor1, setGradientColor1] = useState('#667eea')
  const [gradientColor2, setGradientColor2] = useState('#764ba2')

  // ReactQuill modules configuration
  const quillModules = {
    toolbar: [
      ['bold', 'italic', 'underline'],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      ['clean']
    ],
  }

  const quillFormats = [
    'bold', 'italic', 'underline',
    'list', 'bullet'
  ]

  useEffect(() => {
    fetchProjects()
  }, [])

  const fetchProjects = async () => {
    try {
      const response = await axios.get('/projects')
      setProjects(response.data.data)
    } catch (error) {
      toast.error('Failed to fetch projects')
    } finally {
      setLoading(false)
    }
  }

  const handleAddProject = () => {
    setEditingProject(null)
    setFormData({
      title: '',
      year: new Date().getFullYear().toString(),
      description: '',
      status: 'Upcoming',
      gradient: '',
      category: '',
      participants: '',
      images: [],
      detailedDescription: '',
    })
    setSelectedImages([])
    setGradientColor1('#667eea')
    setGradientColor2('#764ba2')
    setDialogOpen(true)
  }

  const handleEditProject = (project: Project) => {
    setEditingProject(project)
    const projectGradient = project.gradient || ''
    setFormData({
      title: project.title,
      year: project.year,
      description: project.description,
      status: project.status,
      gradient: projectGradient,
      category: project.category,
      participants: project.participants,
      images: project.images,
      detailedDescription: project.detailedDescription,
    })
    // Try to extract colors from existing gradient
    const colorMatch = projectGradient.match(/#[0-9a-fA-F]{6}/g)
    if (colorMatch && colorMatch.length >= 2) {
      setGradientColor1(colorMatch[0])
      setGradientColor2(colorMatch[1])
    }
    setDialogOpen(true)
  }

  const handleSubmit = async () => {
    try {
      setUploading(true)
      
      if (selectedImages.length > 0) {
        // Use FormData for image uploads
        const formDataWithImages = new FormData()
        
        // Add text fields
        Object.entries(formData).forEach(([key, value]) => {
          if (key !== 'images') {
            formDataWithImages.append(key, value as string)
          }
        })
        
        // Add image files
        selectedImages.forEach(file => {
          formDataWithImages.append('images', file)
        })
        
        if (editingProject) {
          // For editing, use the image update endpoint if images are selected
          await axios.put(`/projects/${editingProject._id}/images`, formDataWithImages, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          })
          toast.success('Project images updated successfully')
        } else {
          // For new projects, use the with-images endpoint
          await axios.post('/projects/with-images', formDataWithImages, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          })
          toast.success('Project created successfully with images')
        }
      } else {
        // No images selected, use regular endpoint
        if (editingProject) {
          await axios.put(`/projects/${editingProject._id}`, formData)
          toast.success('Project updated successfully')
        } else {
          await axios.post('/projects', formData)
          toast.success('Project created successfully')
        }
      }
      
      fetchProjects()
      setDialogOpen(false)
      setSelectedImages([])
    } catch (error: unknown) {
      toast.error(getErrorMessage(error, 'Operation failed'))
    } finally {
      setUploading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      try {
        await axios.delete(`/projects/${id}`)
        toast.success('Project deleted successfully')
        fetchProjects()
      } catch (error: unknown) {
        toast.error(getErrorMessage(error, 'Delete failed'))
      }
    }
  }

  const handleInputChange = (field: EditableProjectField, value: string) => {
    setFormData({ ...formData, [field]: value })
  }

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (files) {
      const fileArray = Array.from(files)
      setSelectedImages(fileArray)
    }
  }

  const removeSelectedImage = (index: number) => {
    setSelectedImages(prev => prev.filter((_, i) => i !== index))
  }

  const handleColorChange = (colorNum: 1 | 2, color: string) => {
    if (colorNum === 1) {
      setGradientColor1(color)
      const newGradient = `linear-gradient(135deg, ${color} 0%, ${gradientColor2} 100%)`
      setFormData({ ...formData, gradient: newGradient })
    } else {
      setGradientColor2(color)
      const newGradient = `linear-gradient(135deg, ${gradientColor1} 0%, ${color} 100%)`
      setFormData({ ...formData, gradient: newGradient })
    }
  }

  const applyPresetGradient = (color1: string, color2: string) => {
    setGradientColor1(color1)
    setGradientColor2(color2)
    const newGradient = `linear-gradient(135deg, ${color1} 0%, ${color2} 100%)`
    setFormData({ ...formData, gradient: newGradient })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed': return 'success'
      case 'Ongoing': return 'info'
      case 'Upcoming': return 'warning'
      default: return 'default'
    }
  }

  if (loading) {
    return <Container><Typography>Loading...</Typography></Container>
  }

  return (
    <Container maxWidth="lg">
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4" component="h1">
          Projects Management
        </Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={handleAddProject}
        >
          Add Project
        </Button>
      </Box>

      {projects.length === 0 && (
        <Alert severity="info">No projects found. Create your first project!</Alert>
      )}

      <Grid container spacing={3}>
        {projects.map((project) => (
          <Grid item xs={12} md={6} lg={4} key={project._id}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {project.title}
                </Typography>
                <Typography color="text.secondary" gutterBottom>
                  {project.year} • {project.category}
                </Typography>
                <Chip
                  label={project.status}
                  color={getStatusColor(project.status)}
                  size="small"
                  sx={{ mb: 1 }}
                />
                <Typography variant="body2" sx={{ mt: 1 }}>
                  {project.description.substring(0, 100)}...
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                  Participants: {project.participants}
                </Typography>
              </CardContent>
              <CardActions>
                <IconButton onClick={() => handleEditProject(project)}>
                  <Edit />
                </IconButton>
                <IconButton onClick={() => handleDelete(project._id)}>
                  <Delete />
                </IconButton>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Add/Edit Dialog */}
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>
          {editingProject ? 'Edit Project' : 'Add New Project'}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Title"
                value={formData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Year"
                value={formData.year}
                onChange={(e) => handleInputChange('year', e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                select
                label="Status"
                value={formData.status}
                onChange={(e) => handleInputChange('status', e.target.value)}
                required
              >
                <MenuItem value="Upcoming">Upcoming</MenuItem>
                <MenuItem value="Ongoing">Ongoing</MenuItem>
                <MenuItem value="Completed">Completed</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Category"
                value={formData.category}
                onChange={(e) => handleInputChange('category', e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Participants (Optional)"
                value={formData.participants}
                onChange={(e) => handleInputChange('participants', e.target.value)}
                placeholder="e.g., 100+"
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <FormLabel component="legend" sx={{ mb: 1 }}>
                  Gradient Colors *
                </FormLabel>
                <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', mb: 2 }}>
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="caption" color="text.secondary" sx={{ mb: 0.5, display: 'block' }}>
                      Start Color
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                      <input
                        type="color"
                        value={gradientColor1}
                        onChange={(e) => handleColorChange(1, e.target.value)}
                        style={{ width: 60, height: 40, cursor: 'pointer', border: '1px solid #ccc', borderRadius: 4 }}
                      />
                      <TextField
                        size="small"
                        value={gradientColor1}
                        onChange={(e) => handleColorChange(1, e.target.value)}
                        sx={{ flex: 1 }}
                      />
                    </Box>
                  </Box>
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="caption" color="text.secondary" sx={{ mb: 0.5, display: 'block' }}>
                      End Color
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                      <input
                        type="color"
                        value={gradientColor2}
                        onChange={(e) => handleColorChange(2, e.target.value)}
                        style={{ width: 60, height: 40, cursor: 'pointer', border: '1px solid #ccc', borderRadius: 4 }}
                      />
                      <TextField
                        size="small"
                        value={gradientColor2}
                        onChange={(e) => handleColorChange(2, e.target.value)}
                        sx={{ flex: 1 }}
                      />
                    </Box>
                  </Box>
                </Box>
                
                {/* Gradient Preview */}
                <Box
                  sx={{
                    height: 60,
                    borderRadius: 1,
                    background: formData.gradient || `linear-gradient(135deg, ${gradientColor1} 0%, ${gradientColor2} 100%)`,
                    mb: 1,
                    border: '1px solid #ccc'
                  }}
                />
                
                {/* Preset Gradients */}
                <Box sx={{ mb: 1 }}>
                  <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block' }}>
                    Preset Gradients:
                  </Typography>
                  <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                    <Button
                      size="small"
                      variant="outlined"
                      onClick={() => applyPresetGradient('#667eea', '#764ba2')}
                      sx={{ minWidth: 80, background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white', '&:hover': { opacity: 0.8 } }}
                    >
                      Purple
                    </Button>
                    <Button
                      size="small"
                      variant="outlined"
                      onClick={() => applyPresetGradient('#f093fb', '#f5576c')}
                      sx={{ minWidth: 80, background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)', color: 'white', '&:hover': { opacity: 0.8 } }}
                    >
                      Pink
                    </Button>
                    <Button
                      size="small"
                      variant="outlined"
                      onClick={() => applyPresetGradient('#4facfe', '#00f2fe')}
                      sx={{ minWidth: 80, background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)', color: 'white', '&:hover': { opacity: 0.8 } }}
                    >
                      Blue
                    </Button>
                    <Button
                      size="small"
                      variant="outlined"
                      onClick={() => applyPresetGradient('#43e97b', '#38f9d7')}
                      sx={{ minWidth: 80, background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)', color: 'white', '&:hover': { opacity: 0.8 } }}
                    >
                      Green
                    </Button>
                    <Button
                      size="small"
                      variant="outlined"
                      onClick={() => applyPresetGradient('#fa709a', '#fee140')}
                      sx={{ minWidth: 80, background: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)', color: 'white', '&:hover': { opacity: 0.8 } }}
                    >
                      Sunset
                    </Button>
                    <Button
                      size="small"
                      variant="outlined"
                      onClick={() => applyPresetGradient('#30cfd0', '#330867')}
                      sx={{ minWidth: 80, background: 'linear-gradient(135deg, #30cfd0 0%, #330867 100%)', color: 'white', '&:hover': { opacity: 0.8 } }}
                    >
                      Ocean
                    </Button>
                  </Stack>
                </Box>

                {/* Manual Gradient Input */}
                <TextField
                  fullWidth
                  size="small"
                  label="Manual CSS Gradient (Advanced)"
                  value={formData.gradient}
                  onChange={(e) => handleInputChange('gradient', e.target.value)}
                  placeholder="e.g., linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
                  helperText="You can manually edit the gradient CSS here"
                />
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={2}
                label="Description"
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <FormLabel component="legend" sx={{ mb: 1 }}>
                  Detailed Description * (Max 10,000 characters)
                </FormLabel>
                <Box sx={{ 
                  '& .quill': { 
                    bgcolor: 'background.paper',
                    borderRadius: 1,
                  },
                  '& .ql-container': {
                    minHeight: '200px',
                    fontSize: '1rem',
                  },
                  '& .ql-editor': {
                    minHeight: '200px',
                  }
                }}>
                  <ReactQuill
                    theme="snow"
                    value={formData.detailedDescription}
                    onChange={(value) => handleInputChange('detailedDescription', value)}
                    modules={quillModules}
                    formats={quillFormats}
                    placeholder="Enter detailed description with formatting..."
                  />
                </Box>
                <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5 }}>
                  {formData.detailedDescription.length} / 10,000 characters
                </Typography>
              </FormControl>
            </Grid>
            
            {/* Project Images Upload */}
            <Grid item xs={12}>
              <FormControl fullWidth>
                <FormLabel component="legend" sx={{ mb: 1 }}>
                  Project Images - Max 5 files
                </FormLabel>
                <Input
                  type="file"
                  inputProps={{ 
                    multiple: true, 
                    accept: 'image/*',
                    max: 5 
                  }}
                  onChange={handleImageChange}
                  startAdornment={<CloudUpload sx={{ mr: 1 }} />}
                />
                {selectedImages.length > 0 && (
                  <Box sx={{ mt: 1 }}>
                    <Typography variant="body2" color="text.secondary">
                      Selected: {selectedImages.length} files
                    </Typography>
                    <Stack direction="row" spacing={1} flexWrap="wrap" sx={{ mt: 1 }}>
                      {selectedImages.map((file, index) => (
                        <Box key={index} sx={{ position: 'relative', display: 'inline-block' }}>
                          <Avatar
                            src={URL.createObjectURL(file)}
                            sx={{ width: 40, height: 40 }}
                          />
                          <IconButton
                            size="small"
                            onClick={() => removeSelectedImage(index)}
                            sx={{
                              position: 'absolute',
                              top: -8,
                              right: -8,
                              bgcolor: 'error.main',
                              color: 'white',
                              '&:hover': { bgcolor: 'error.dark' },
                              width: 20,
                              height: 20,
                            }}
                          >
                            <Close fontSize="small" />
                          </IconButton>
                        </Box>
                      ))}
                    </Stack>
                  </Box>
                )}
              </FormControl>
            </Grid>
            
            {/* Show existing images if editing */}
            {editingProject && formData.images.length > 0 && (
              <Grid item xs={12}>
                <FormLabel component="legend" sx={{ mb: 1 }}>
                  Current Project Images
                </FormLabel>
                <Stack direction="row" spacing={1} flexWrap="wrap">
                  {formData.images.map((imageUrl, index) => (
                    <Avatar
                      key={index}
                      src={imageUrl}
                      sx={{ width: 40, height: 40 }}
                    />
                  ))}
                </Stack>
              </Grid>
            )}
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)} disabled={uploading}>
            Cancel
          </Button>
          <Button 
            onClick={handleSubmit} 
            variant="contained" 
            disabled={uploading}
          >
            {uploading ? 'Uploading...' : (editingProject ? 'Update' : 'Create')}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  )
}

export default Projects
