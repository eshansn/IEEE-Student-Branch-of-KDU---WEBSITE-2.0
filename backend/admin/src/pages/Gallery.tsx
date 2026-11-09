import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Switch,
  FormControlLabel,
  IconButton,
  Chip,
  Alert,
  CircularProgress,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  Paper,
  Divider,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  LinearProgress,
  List,
  ListItem,
  ListItemText,
  ListItemIcon
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  PhotoLibrary as PhotoIcon,
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
  Star as StarIcon,
  CloudUpload as UploadIcon,
  Event as EventIcon,
  CheckCircle as CheckCircleIcon,
  Error as ErrorIcon,
  CloudQueue as CloudQueueIcon,
  Close as CloseIcon,
  Cancel as CancelIcon,
  DragIndicator as DragIndicatorIcon
} from '@mui/icons-material';
import API_BASE_URL from '../config/api';

interface GalleryImage {
  url: string;
  title: string;
  size: 'small' | 'medium' | 'large' | 'wide' | 'tall';
}

interface GalleryItem {
  _id?: string;
  eventName: string;
  description: string;
  year: string;
  color: string;
  images: GalleryImage[];
  featured: boolean;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
}

interface UploadProgress {
  fileName: string;
  status: 'pending' | 'uploading' | 'success' | 'error';
  progress: number;
  error?: string;
}

const Gallery: React.FC = () => {
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingItem, setEditingItem] = useState<GalleryItem | null>(null);
  const [uploading, setUploading] = useState(false);
  
  // Progress tracking
  const [showProgress, setShowProgress] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<UploadProgress[]>([]);
  const [currentStep, setCurrentStep] = useState('');
  const [overallProgress, setOverallProgress] = useState(0);
  const [uploadCancelled, setUploadCancelled] = useState(false);
  const [uploadFailed, setUploadFailed] = useState(false);

  // Form state
  const [formData, setFormData] = useState<GalleryItem>({
    eventName: '',
    description: '',
    year: new Date().getFullYear().toString(),
    color: '#0066CC',
    images: [],
    featured: false,
    isActive: true
  });

  // Image upload state
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [imageTitles, setImageTitles] = useState<string[]>([]);
  const [imageSizes, setImageSizes] = useState<string[]>([]);
  const [imagePreviewUrls, setImagePreviewUrls] = useState<string[]>([]);
  const [imageDimensions, setImageDimensions] = useState<{width: number, height: number}[]>([]);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);

  // Fetch gallery items from backend
  const fetchGalleryItems = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/gallery/admin/all`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch gallery items');
      }

      const data = await response.json();
      setGalleryItems(data.success ? data.data || [] : []);
      setError(null);
    } catch (err) {
      console.error('Error fetching gallery items:', err);
      setError('Failed to load gallery items. Please check if the backend server is running.');
      setGalleryItems([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGalleryItems();
  }, []);

  // Handle form submission
  const handleSubmit = async () => {
    try {
      setUploading(true);
      setShowProgress(true);
      setOverallProgress(0);
      setUploadCancelled(false);
      setUploadFailed(false);
      
      // Initialize progress tracking for each file
      const progressItems: UploadProgress[] = selectedFiles.map(file => ({
        fileName: file.name,
        status: 'pending',
        progress: 0
      }));
      setUploadProgress(progressItems);
      
      // Step 1: Preparing data
      setCurrentStep('Preparing gallery data...');
      setOverallProgress(5);
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const formDataToSend = new FormData();
      formDataToSend.append('eventName', formData.eventName);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('year', formData.year);
      formDataToSend.append('color', formData.color);
      formDataToSend.append('featured', formData.featured.toString());
      formDataToSend.append('isActive', formData.isActive.toString());

      // Step 2: Processing images
      setCurrentStep('Processing images...');
      setOverallProgress(10);
      
      const stepProgress = 80 / selectedFiles.length; // 80% for image uploads
      
      // Add images with progress tracking
      for (let index = 0; index < selectedFiles.length; index++) {
        // Check if upload was cancelled
        if (uploadCancelled) {
          setCurrentStep('Upload cancelled by user');
          setUploadProgress(prev => prev.map((item) => 
            item.status === 'pending'
              ? { ...item, status: 'error', error: 'Cancelled' }
              : item
          ));
          return;
        }
        
        const file = selectedFiles[index];
        
        // Update status to uploading
        setUploadProgress(prev => prev.map((item, idx) => 
          idx === index 
            ? { ...item, status: 'uploading', progress: 50 }
            : item
        ));
        setCurrentStep(`Uploading ${file.name}...`);
        
        formDataToSend.append('images', file);
        formDataToSend.append(`imageTitle_${index}`, imageTitles[index] || `Image ${index + 1}`);
        formDataToSend.append(`imageSize_${index}`, imageSizes[index] || 'medium');
        
        // Simulate upload progress
        await new Promise(resolve => setTimeout(resolve, 300));
        
        // Update status to success
        setUploadProgress(prev => prev.map((item, idx) => 
          idx === index 
            ? { ...item, status: 'success', progress: 100 }
            : item
        ));
        
        // Update overall progress
        const progress = 10 + (index + 1) * stepProgress;
        setOverallProgress(Math.min(progress, 90));
      }

      // Step 3: Saving to database
      setCurrentStep('Saving to database...');
      setOverallProgress(92);

      const url = editingItem 
        ? `${API_BASE_URL}/gallery/${editingItem._id}`
        : `${API_BASE_URL}/gallery/with-images`;
      
      const method = editingItem ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: formDataToSend
      });

      if (!response.ok) {
        throw new Error('Failed to save gallery item');
      }

      setCurrentStep('Finalizing...');
      setOverallProgress(95);

      await fetchGalleryItems();
      
      setCurrentStep('Completed successfully!');
      setOverallProgress(100);
      
      // Wait a bit before closing
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      handleCloseDialog();
      setShowProgress(false);
      setError(null);
    } catch (err) {
      console.error('Error saving gallery item:', err);
      setError('Failed to save gallery item. Please try again.');
      setCurrentStep('Upload failed!');
      setUploadFailed(true);
      
      // Mark remaining items as error
      setUploadProgress(prev => prev.map(item => 
        item.status === 'pending' || item.status === 'uploading'
          ? { ...item, status: 'error', error: 'Upload failed' }
          : item
      ));
    } finally {
      setUploading(false);
    }
  };

  // Handle upload cancellation
  const handleCancelUpload = () => {
    setUploadCancelled(true);
    setUploading(false);
  };

  // Close progress dialog
  const handleCloseProgress = () => {
    setShowProgress(false);
    if (overallProgress === 100) {
      handleCloseDialog();
    }
  };

  // Handle delete
  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this gallery item?')) {
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/gallery/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to delete gallery item');
      }

      await fetchGalleryItems();
      setError(null);
    } catch (err) {
      console.error('Error deleting gallery item:', err);
      setError('Failed to delete gallery item. Please try again.');
    }
  };

  // Handle edit
  const handleEdit = (item: GalleryItem) => {
    setEditingItem(item);
    setFormData({ ...item });
    setSelectedFiles([]);
    setImageTitles([]);
    setImageSizes([]);
    setOpenDialog(true);
  };

  // Handle close dialog
  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingItem(null);
    setFormData({
      eventName: '',
      description: '',
      year: new Date().getFullYear().toString(),
      color: '#0066CC',
      images: [],
      featured: false,
      isActive: true
    });
    setSelectedFiles([]);
    setImageTitles([]);
    setImageSizes([]);
    setImagePreviewUrls([]);
    setImageDimensions([]);
    setUploadProgress([]);
    setCurrentStep('');
    setOverallProgress(0);
    setUploadCancelled(false);
    setUploadFailed(false);
  };

  // Remove a selected image
  const removeSelectedImage = (indexToRemove: number) => {
    setSelectedFiles(prev => prev.filter((_, idx) => idx !== indexToRemove));
    setImageTitles(prev => prev.filter((_, idx) => idx !== indexToRemove));
    setImageSizes(prev => prev.filter((_, idx) => idx !== indexToRemove));
    setImagePreviewUrls(prev => prev.filter((_, idx) => idx !== indexToRemove));
    setImageDimensions(prev => prev.filter((_, idx) => idx !== indexToRemove));
  };

  // Drag and drop handlers
  const handleDragStart = (index: number) => {
    setDraggedIndex(index);
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    setDragOverIndex(index);
  };

  const handleDragLeave = () => {
    setDragOverIndex(null);
  };

  const handleDrop = (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault();
    
    if (draggedIndex === null || draggedIndex === dropIndex) {
      setDraggedIndex(null);
      setDragOverIndex(null);
      return;
    }

    // Reorder all arrays
    const reorderArray = <T,>(arr: T[]): T[] => {
      const newArr = [...arr];
      const [movedItem] = newArr.splice(draggedIndex, 1);
      newArr.splice(dropIndex, 0, movedItem);
      return newArr;
    };

    setSelectedFiles(prev => reorderArray(prev));
    setImageTitles(prev => reorderArray(prev));
    setImageSizes(prev => reorderArray(prev));
    setImagePreviewUrls(prev => reorderArray(prev));
    setImageDimensions(prev => reorderArray(prev));
    
    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  // Analyze image dimensions and determine size category
  const analyzeImageSize = (width: number, height: number): string => {
    const aspectRatio = width / height;
    const area = width * height;
    
    // Determine if image is wide (landscape) or tall (portrait)
    if (aspectRatio > 1.5) {
      // Wide/landscape images
      return 'wide';
    } else if (aspectRatio < 0.67) {
      // Tall/portrait images
      return 'tall';
    } else {
      // Square-ish images - categorize by area/size
      if (area < 500000) { // Less than ~707x707
        return 'small';
      } else if (area < 1500000) { // Less than ~1225x1225
        return 'medium';
      } else {
        return 'large';
      }
    }
  };

  // Handle file selection with automatic size detection
  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setSelectedFiles(files);
    setImageTitles(files.map((_, index) => `Image ${index + 1}`));
    
    // Analyze each image to determine its size category and create previews
    const analysisPromises = files.map((file) => {
      return new Promise<{size: string, previewUrl: string, dimensions: {width: number, height: number}}>((resolve) => {
        const img = new Image();
        const reader = new FileReader();
        
        reader.onload = (e) => {
          const dataUrl = e.target?.result as string;
          img.src = dataUrl;
        };
        
        img.onload = () => {
          const size = analyzeImageSize(img.width, img.height);
          resolve({
            size,
            previewUrl: img.src,
            dimensions: { width: img.width, height: img.height }
          });
        };
        
        img.onerror = () => {
          // Default to medium if image can't be loaded
          resolve({
            size: 'medium',
            previewUrl: '',
            dimensions: { width: 0, height: 0 }
          });
        };
        
        reader.readAsDataURL(file);
      });
    });
    
    // Wait for all images to be analyzed
    const results = await Promise.all(analysisPromises);
    setImageSizes(results.map(r => r.size));
    setImagePreviewUrls(results.map(r => r.previewUrl));
    setImageDimensions(results.map(r => r.dimensions));
  };

  // Update image metadata
  const updateImageTitle = (index: number, title: string) => {
    const newTitles = [...imageTitles];
    newTitles[index] = title;
    setImageTitles(newTitles);
  };

  const updateImageSize = (index: number, size: string) => {
    const newSizes = [...imageSizes];
    newSizes[index] = size;
    setImageSizes(newSizes);
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold', color: '#1976d2' }}>
          <EventIcon sx={{ mr: 2, verticalAlign: 'middle' }} />
          Gallery Management
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setOpenDialog(true)}
          sx={{ backgroundColor: '#1976d2' }}
        >
          Add New Event
        </Button>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      <Grid container spacing={3}>
        {galleryItems.map((item) => (
          <Grid item xs={12} sm={6} md={4} key={item._id}>
            <Card 
              sx={{ 
                height: '100%',
                border: `2px solid ${item.color}20`,
                borderLeft: `4px solid ${item.color}`,
                transition: 'all 0.3s ease',
                '&:hover': {
                  boxShadow: 3,
                  transform: 'translateY(-2px)'
                }
              }}
            >
              <CardContent>
                <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={2}>
                  <Typography variant="h6" component="h2" sx={{ fontWeight: 'bold', color: item.color }}>
                    {item.eventName}
                  </Typography>
                  <Box>
                    {item.featured && (
                      <Chip
                        icon={<StarIcon />}
                        label="Featured"
                        size="small"
                        sx={{ mr: 1, backgroundColor: '#ffd700', color: '#000' }}
                      />
                    )}
                    <Chip
                      icon={item.isActive ? <VisibilityIcon /> : <VisibilityOffIcon />}
                      label={item.isActive ? 'Active' : 'Inactive'}
                      size="small"
                      color={item.isActive ? 'success' : 'default'}
                    />
                  </Box>
                </Box>

                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  {item.description}
                </Typography>

                <Box display="flex" gap={1} mb={2}>
                  <Chip label={item.year} size="small" variant="outlined" />
                  <Chip 
                    label={`${item.images.length} images`} 
                    size="small" 
                    variant="outlined"
                    icon={<PhotoIcon />}
                  />
                </Box>

                {item.images.length > 0 && (
                  <ImageList cols={3} rowHeight={80} sx={{ mb: 2 }}>
                    {item.images.slice(0, 6).map((image, index) => (
                      <ImageListItem key={index}>
                        <img
                          src={image.url}
                          alt={image.title}
                          loading="lazy"
                          style={{ objectFit: 'cover' }}
                        />
                        <ImageListItemBar
                          title={image.size}
                          sx={{ 
                            background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
                            '& .MuiImageListItemBar-title': { fontSize: '0.7rem' }
                          }}
                        />
                      </ImageListItem>
                    ))}
                  </ImageList>
                )}

                <Box display="flex" justifyContent="space-between" alignItems="center">
                  <Typography variant="caption" color="text.secondary">
                    Created: {item.createdAt ? new Date(item.createdAt).toLocaleDateString() : 'N/A'}
                  </Typography>
                  <Box>
                    <IconButton 
                      size="small" 
                      onClick={() => handleEdit(item)}
                      sx={{ color: '#1976d2' }}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton 
                      size="small" 
                      onClick={() => handleDelete(item._id!)}
                      sx={{ color: '#d32f2f' }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {galleryItems.length === 0 && !loading && (
        <Paper sx={{ p: 6, textAlign: 'center', mt: 4 }}>
          <EventIcon sx={{ fontSize: 64, color: 'grey.400', mb: 2 }} />
          <Typography variant="h6" color="text.secondary" mb={1}>
            No Gallery Items Yet
          </Typography>
          <Typography variant="body2" color="text.secondary" mb={3}>
            Create your first event category to start building your gallery
          </Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => setOpenDialog(true)}
          >
            Add Your First Event
          </Button>
        </Paper>
      )}

      {/* Add/Edit Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
        <DialogTitle>
          {editingItem ? 'Edit Event Category' : 'Add New Event Category'}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2 }}>
            <TextField
              fullWidth
              label="Event Name"
              value={formData.eventName}
              onChange={(e) => setFormData({ ...formData, eventName: e.target.value })}
              sx={{ mb: 3 }}
              required
            />

            <TextField
              fullWidth
              label="Description"
              multiline
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              sx={{ mb: 3 }}
              required
            />

            <Box display="flex" gap={2} mb={3}>
              <TextField
                label="Year"
                value={formData.year}
                onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                required
                sx={{ flex: 1 }}
              />
              <TextField
                label="Theme Color"
                type="color"
                value={formData.color}
                onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                sx={{ flex: 1 }}
              />
            </Box>

            <Box display="flex" gap={2} mb={3}>
              <FormControlLabel
                control={
                  <Switch
                    checked={formData.featured}
                    onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                  />
                }
                label="Featured Event"
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={formData.isActive}
                    onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                  />
                }
                label="Active on Website"
              />
            </Box>

            <Divider sx={{ my: 3 }} />

            <Typography variant="h6" sx={{ mb: 2 }}>
              Event Images
            </Typography>

            <Button
              variant="outlined"
              component="label"
              startIcon={<UploadIcon />}
              sx={{ mb: 3 }}
            >
              Select Images
              <input
                type="file"
                hidden
                multiple
                accept="image/*"
                onChange={handleFileChange}
              />
            </Button>

            {selectedFiles.length > 0 && (
              <Box>
                <Typography variant="subtitle2" sx={{ mb: 2 }}>
                  Configure Images ({selectedFiles.length} selected)
                </Typography>
                <Alert severity="info" sx={{ mb: 2 }}>
                  <strong>Drag and drop</strong> to reorder images. Image sizes are automatically detected based on dimensions. You can manually adjust if needed.
                </Alert>
                {selectedFiles.map((file, index) => (
                  <Paper 
                    key={index} 
                    draggable
                    onDragStart={() => handleDragStart(index)}
                    onDragOver={(e) => handleDragOver(e, index)}
                    onDragLeave={handleDragLeave}
                    onDrop={(e) => handleDrop(e, index)}
                    onDragEnd={handleDragEnd}
                    sx={{ 
                      p: 2, 
                      mb: 2, 
                      backgroundColor: draggedIndex === index ? '#e3f2fd' : '#f5f5f5',
                      border: dragOverIndex === index ? '2px solid #1976d2' : '2px solid #e0e0e0',
                      position: 'relative',
                      cursor: 'move',
                      opacity: draggedIndex === index ? 0.5 : 1,
                      transition: 'all 0.2s ease',
                      '&:hover': {
                        backgroundColor: '#f0f0f0',
                        boxShadow: 2
                      }
                    }}
                  >
                    {/* Drag Handle */}
                    <Box
                      sx={{
                        position: 'absolute',
                        left: 8,
                        top: '50%',
                        transform: 'translateY(-50%)',
                        cursor: 'move',
                        color: '#999',
                        '&:hover': {
                          color: '#1976d2'
                        }
                      }}
                    >
                      <DragIndicatorIcon />
                    </Box>
                    
                    {/* Order Badge */}
                    <Chip
                      label={`#${index + 1}`}
                      size="small"
                      sx={{
                        position: 'absolute',
                        top: 8,
                        left: 8,
                        backgroundColor: '#1976d2',
                        color: '#fff',
                        fontWeight: 'bold',
                        fontSize: '0.7rem',
                        height: 20,
                        minWidth: 30
                      }}
                    />
                    
                    {/* Remove Button */}
                    <IconButton
                      size="small"
                      onClick={() => removeSelectedImage(index)}
                      sx={{
                        position: 'absolute',
                        top: 8,
                        right: 8,
                        backgroundColor: '#fff',
                        boxShadow: 1,
                        zIndex: 1,
                        '&:hover': {
                          backgroundColor: '#ffebee',
                          color: '#d32f2f'
                        }
                      }}
                    >
                      <CloseIcon fontSize="small" />
                    </IconButton>
                    <Box display="flex" gap={2} mb={2} sx={{ pl: 3 }}>
                      {/* Image Preview */}
                      <Box 
                        sx={{ 
                          width: 120, 
                          height: 120, 
                          flexShrink: 0,
                          border: '2px solid #ddd',
                          borderRadius: 1,
                          overflow: 'hidden',
                          backgroundColor: '#fff',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                      >
                        {imagePreviewUrls[index] ? (
                          <img
                            src={imagePreviewUrls[index]}
                            alt={file.name}
                            style={{
                              maxWidth: '100%',
                              maxHeight: '100%',
                              objectFit: 'contain'
                            }}
                          />
                        ) : (
                          <CircularProgress size={30} />
                        )}
                      </Box>

                      {/* Image Info */}
                      <Box flex={1}>
                        <Box display="flex" alignItems="center" gap={2} mb={1}>
                          <Typography variant="body2" sx={{ fontWeight: 'bold', flex: 1 }}>
                            {file.name}
                          </Typography>
                          <Chip 
                            label={`Auto: ${imageSizes[index]?.toUpperCase() || 'DETECTING...'}`}
                            size="small"
                            color="primary"
                            variant="outlined"
                          />
                        </Box>
                        
                        {imageDimensions[index] && (
                          <Box display="flex" gap={1} mb={2}>
                            <Chip 
                              label={`${imageDimensions[index].width} × ${imageDimensions[index].height}`}
                              size="small"
                              variant="outlined"
                              sx={{ fontSize: '0.75rem' }}
                            />
                            <Chip 
                              label={`Ratio: ${(imageDimensions[index].width / imageDimensions[index].height).toFixed(2)}`}
                              size="small"
                              variant="outlined"
                              sx={{ fontSize: '0.75rem' }}
                            />
                            <Chip 
                              label={`${(file.size / 1024).toFixed(0)} KB`}
                              size="small"
                              variant="outlined"
                              sx={{ fontSize: '0.75rem' }}
                            />
                          </Box>
                        )}

                        <Box display="flex" gap={2}>
                          <TextField
                            label="Image Title"
                            value={imageTitles[index] || ''}
                            onChange={(e) => updateImageTitle(index, e.target.value)}
                            size="small"
                            sx={{ flex: 1 }}
                          />
                          <FormControl size="small" sx={{ minWidth: 150 }}>
                            <InputLabel>Size (Manual Override)</InputLabel>
                            <Select
                              value={imageSizes[index] || 'medium'}
                              onChange={(e) => updateImageSize(index, e.target.value)}
                              label="Size (Manual Override)"
                            >
                              <MenuItem value="small">Small (Square, Small)</MenuItem>
                              <MenuItem value="medium">Medium (Square, Medium)</MenuItem>
                              <MenuItem value="large">Large (Square, Large)</MenuItem>
                              <MenuItem value="wide">Wide (Landscape)</MenuItem>
                              <MenuItem value="tall">Tall (Portrait)</MenuItem>
                            </Select>
                          </FormControl>
                        </Box>
                      </Box>
                    </Box>
                  </Paper>
                ))}
              </Box>
            )}

            {editingItem && editingItem.images.length > 0 && (
              <Box>
                <Typography variant="subtitle2" sx={{ mb: 2 }}>
                  Existing Images ({editingItem.images.length})
                </Typography>
                <ImageList cols={4} rowHeight={120}>
                  {editingItem.images.map((image, index) => (
                    <ImageListItem key={index}>
                      <img
                        src={image.url}
                        alt={image.title}
                        loading="lazy"
                        style={{ objectFit: 'cover' }}
                      />
                      <ImageListItemBar
                        title={image.title}
                        subtitle={image.size}
                        sx={{ 
                          background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)'
                        }}
                      />
                    </ImageListItem>
                  ))}
                </ImageList>
              </Box>
            )}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button 
            onClick={handleSubmit} 
            variant="contained"
            disabled={uploading || !formData.eventName || !formData.description}
          >
            {uploading ? <CircularProgress size={20} /> : (editingItem ? 'Update' : 'Create')}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Progress Dialog */}
      <Dialog 
        open={showProgress} 
        maxWidth="sm" 
        fullWidth
        disableEscapeKeyDown={uploading && !uploadFailed && !uploadCancelled}
      >
        <DialogTitle>
          <Box display="flex" alignItems="center" gap={1}>
            <CloudQueueIcon color="primary" />
            <Typography variant="h6">Upload Progress</Typography>
          </Box>
        </DialogTitle>
        <DialogContent>
          <Box sx={{ mb: 3 }}>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              {currentStep}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <LinearProgress 
                variant="determinate" 
                value={overallProgress} 
                sx={{ flex: 1, height: 8, borderRadius: 4 }}
              />
              <Typography variant="body2" fontWeight="bold">
                {Math.round(overallProgress)}%
              </Typography>
            </Box>
          </Box>

          <Divider sx={{ my: 2 }} />

          {uploadProgress.length > 0 && (
            <Box>
              <Typography variant="subtitle2" sx={{ mb: 2 }}>
                Image Upload Status
              </Typography>
              <List dense>
                {uploadProgress.map((item, index) => (
                  <ListItem key={index}>
                    <ListItemIcon>
                      {item.status === 'pending' && (
                        <CircularProgress size={20} sx={{ color: 'grey.400' }} />
                      )}
                      {item.status === 'uploading' && (
                        <CircularProgress size={20} />
                      )}
                      {item.status === 'success' && (
                        <CheckCircleIcon color="success" />
                      )}
                      {item.status === 'error' && (
                        <ErrorIcon color="error" />
                      )}
                    </ListItemIcon>
                    <ListItemText
                      primary={item.fileName}
                      secondary={
                        <Box>
                          <Typography variant="caption" display="block">
                            {item.status === 'pending' && 'Waiting...'}
                            {item.status === 'uploading' && 'Uploading...'}
                            {item.status === 'success' && 'Uploaded successfully'}
                            {item.status === 'error' && (item.error || 'Upload failed')}
                          </Typography>
                          {(item.status === 'uploading' || item.status === 'success') && (
                            <LinearProgress 
                              variant="determinate" 
                              value={item.progress} 
                              sx={{ mt: 0.5, height: 4, borderRadius: 2 }}
                              color={item.status === 'success' ? 'success' : 'primary'}
                            />
                          )}
                        </Box>
                      }
                    />
                  </ListItem>
                ))}
              </List>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          {uploading && !uploadFailed && !uploadCancelled ? (
            <Button 
              onClick={handleCancelUpload}
              variant="outlined"
              color="error"
              startIcon={<CancelIcon />}
            >
              Cancel Upload
            </Button>
          ) : (
            <Button 
              onClick={handleCloseProgress}
              variant="contained"
              color={overallProgress === 100 ? "success" : uploadFailed || uploadCancelled ? "error" : "primary"}
              startIcon={<CloseIcon />}
            >
              Close
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Gallery;
