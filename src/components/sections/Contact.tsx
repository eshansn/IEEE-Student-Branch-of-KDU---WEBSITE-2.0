import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  TextField,
  Button,
  Chip,
  useTheme,
  alpha,
  Fade,
  Slide,
  Snackbar,
  Alert,
  CircularProgress,
} from '@mui/material';
import {
  Send,
} from '@mui/icons-material';
import axios from 'axios';

// API Configuration
const API_BASE_URL = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
  ? 'http://localhost:3000/api'
  : 'https://kdu-ieee-backend.vercel.app/api';

const Contact: React.FC = () => {
  const theme = useTheme();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await axios.post(`${API_BASE_URL}/contact`, formData);
      
      if (response.data.success) {
        setSnackbarMessage('Thank you for your message! We will get back to you soon.');
        setSnackbarSeverity('success');
        setFormData({ name: '', email: '', message: '' });
      }
    } catch (error: unknown) {
      console.error('Contact form error:', error);
      const apiMessage = axios.isAxiosError<{ error?: string }>(error)
        ? error.response?.data?.error
        : undefined;
      setSnackbarMessage(
        apiMessage || 'Failed to send message. Please try again later.'
      );
      setSnackbarSeverity('error');
    } finally {
      setIsSubmitting(false);
      setOpenSnackbar(true);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <Box
      id="contact"
      sx={{
        py: 12,
        background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background decorations */}
      <Box
        sx={{
          position: 'absolute',
          top: 200,
          left: -150,
          width: 400,
          height: 400,
          borderRadius: '50%',
          background: 'linear-gradient(135deg, rgba(0, 102, 204, 0.08), rgba(51, 153, 255, 0.12))',
          filter: 'blur(100px)',
          animation: 'float 12s ease-in-out infinite',
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          bottom: 100,
          right: -100,
          width: 350,
          height: 350,
          borderRadius: '50%',
          background: 'linear-gradient(135deg, rgba(255, 215, 0, 0.08), rgba(255, 165, 0, 0.12))',
          filter: 'blur(80px)',
          animation: 'float 10s ease-in-out infinite reverse',
        }}
      />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <Box textAlign="center" sx={{ mb: 10 }}>
          <Slide direction="down" in={true} timeout={600}>
            <Box sx={{ mb: 3 }}>
              <Chip
                label="Contact Us"
                sx={{
                  background: 'linear-gradient(135deg, #0066CC 0%, #3399FF 100%)',
                  color: 'white',
                  fontWeight: 600,
                  px: 2,
                  py: 1,
                  fontSize: '0.9rem',
                  textTransform: 'uppercase',
                  letterSpacing: 1,
                }}
              />
            </Box>
          </Slide>

          <Fade in={true} timeout={800}>
            <Typography
              variant="h2"
              sx={{
                fontSize: { xs: '2.5rem', md: '4rem', lg: '4.5rem' },
                fontWeight: 700,
                mb: 2,
                background: 'linear-gradient(135deg, #0066CC 0%, #3399FF 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontFamily: '"Space Grotesk", sans-serif',
              }}
            >
              CONTACT
            </Typography>
          </Fade>

          <Fade in={true} timeout={1000}>
            <Typography
              variant="h4"
              sx={{
                fontWeight: 600,
                color: '#0066CC',
                fontFamily: '"Poppins", sans-serif',
                mb: 3,
              }}
            >
              GET IN TOUCH
            </Typography>
          </Fade>

          <Fade in={true} timeout={1200}>
            <Typography
              variant="h6"
              sx={{
                color: theme.palette.text.secondary,
                maxWidth: 700,
                mx: 'auto',
                lineHeight: 1.6,
                fontSize: '1.2rem',
              }}
            >
              Ready to join our community or have questions? We'd love to hear from you!
            </Typography>
          </Fade>
        </Box>

        {/* Contact Form - Full Width */}
        <Box sx={{ mb: 8 }}>
          <Fade in={true} timeout={1400}>
            <Paper
              elevation={0}
              sx={{
                background: alpha('#ffffff', 0.8),
                backdropFilter: 'blur(20px)',
                borderRadius: 4,
                p: 6,
                border: '1px solid rgba(255, 255, 255, 0.3)',
                maxWidth: 800,
                mx: 'auto',
              }}
            >
                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: 700,
                    mb: 4,
                    color: theme.palette.text.primary,
                    textAlign: 'center',
                    fontFamily: '"Poppins", sans-serif',
                  }}
                >
                  Send us a Message
                </Typography>

                <Box component="form" onSubmit={handleSubmit} sx={{ space: 3 }}>
                  <TextField
                    fullWidth
                    label="Name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    variant="outlined"
                    sx={{
                      mb: 3,
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 3,
                        '&:hover .MuiOutlinedInput-notchedOutline': {
                          borderColor: theme.palette.primary.main,
                        },
                      },
                    }}
                    placeholder="Your Name"
                  />

                  <TextField
                    fullWidth
                    label="Email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    variant="outlined"
                    sx={{
                      mb: 3,
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 3,
                        '&:hover .MuiOutlinedInput-notchedOutline': {
                          borderColor: theme.palette.primary.main,
                        },
                      },
                    }}
                    placeholder="your.email@example.com"
                  />

                  <TextField
                    fullWidth
                    label="Message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    multiline
                    rows={5}
                    variant="outlined"
                    sx={{
                      mb: 4,
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 3,
                        '&:hover .MuiOutlinedInput-notchedOutline': {
                          borderColor: theme.palette.primary.main,
                        },
                      },
                    }}
                    placeholder="Your message..."
                  />

                  <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    size="large"
                    startIcon={isSubmitting ? <CircularProgress size={20} color="inherit" /> : <Send />}
                    disabled={isSubmitting}
                    sx={{
                      py: 2,
                      borderRadius: 3,
                      fontSize: '1.1rem',
                      fontWeight: 600,
                      background: 'linear-gradient(135deg, #0066CC 0%, #3399FF 100%)',
                      boxShadow: '0 8px 25px rgba(0, 102, 204, 0.3)',
                      '&:hover': {
                        background: 'linear-gradient(135deg, #003366 0%, #0066CC 100%)',
                        transform: 'translateY(-2px)',
                        boxShadow: '0 12px 35px rgba(0, 102, 204, 0.4)',
                      },
                      '&:disabled': {
                        background: 'linear-gradient(135deg, #99b3cc 0%, #b3d1ff 100%)',
                      },
                    }}
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </Button>
                </Box>
              </Paper>
            </Fade>
        </Box>
      </Container>

      {/* Success/Error Snackbar */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setOpenSnackbar(false)}
          severity={snackbarSeverity}
          sx={{ width: '100%' }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Contact;
