import React, { useEffect, useRef, useState } from 'react';
import {
  Box,
  Container,
  Typography,
  alpha,
  Fade,
  Slide,
  Chip,
  CircularProgress,
} from '@mui/material';
import type { EventCategory, ImageItem } from '../../types/memory';
import { galleryService } from '../../services/galleryService';
import { convertGalleryItemsToEventCategories } from '../../utils/galleryUtils';

const Gallery: React.FC = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [selectedEvent, setSelectedEvent] = useState<string>('all');
  const [eventCategories, setEventCategories] = useState<Record<string, EventCategory>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isDataReady, setIsDataReady] = useState(false);

  // Fetch memories from database on component mount
  useEffect(() => {
    const fetchMemories = async () => {
      try {
        setLoading(true);
        setError(null);

        const galleryItems = await galleryService.getActiveGalleryItems();

        if (galleryItems && galleryItems.length > 0) {
          const categories = convertGalleryItemsToEventCategories(galleryItems);
          setEventCategories(categories);
          setIsDataReady(true);
        } else {
          // No gallery items found from API
          console.warn('No gallery items found from API');
          setEventCategories({
            all: {
              name: 'All Events',
              color: '#0066CC',
              images: []
            }
          });
        }
      } catch (err) {
        console.error('Error fetching gallery items:', err);
        setError('Failed to load gallery items');

        // Show empty state on error
        setEventCategories({
          all: {
            name: 'All Events',
            color: '#0066CC',
            images: []
          }
        });
      } finally {
        setLoading(false);
      }
    };

    fetchMemories();
  }, []);

  // Get current images to display
  const getCurrentImages = (): ImageItem[] => {
    if (!eventCategories[selectedEvent]) {
      return [];
    }
    return eventCategories[selectedEvent].images || [];
  };

  // Function to change event category
  const selectEvent = (eventKey: string) => {
    setSelectedEvent(eventKey);
    // Reset scroll position when changing events
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft = 0;
    }
  };

  // Auto-scroll effect
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container || !isDataReady) return;

    let scrollAmount = 0;
    let animationId: number;
    const scroll = () => {
      if (container) {
        scrollAmount += 1.2; // Increased speed from 0.5 to 1.2

        // Smooth reset without visible jump
        const maxScroll = container.scrollWidth / 2;
        if (scrollAmount >= maxScroll) {
          scrollAmount = 0;
        }

        container.scrollLeft = scrollAmount;
      }
      animationId = requestAnimationFrame(scroll);
    };

    // Start the animation immediately
    animationId = requestAnimationFrame(scroll);

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [selectedEvent, isDataReady]); // Re-run when selected event changes or data is ready

  const getImageStyle = (size: string) => {
    switch (size) {
      case 'large':
        return { width: 400, height: 300 };
      case 'tall':
        return { width: 250, height: 400 };
      case 'wide':
        return { width: 450, height: 250 };
      case 'medium':
      default:
        return { width: 300, height: 300 };
    }
  };

  // Show loading state
  if (loading) {
    return (
      <Box
        id="gallery"
        sx={{
          py: 12,
          background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 50%, #0a0a0a 100%)',
          position: 'relative',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '600px',
        }}
      >
        <Box textAlign="center">
          <CircularProgress sx={{ color: '#0066CC', mb: 2 }} />
          <Typography variant="h6" sx={{ color: 'white' }}>
            Loading Our Journey...
          </Typography>
        </Box>
      </Box>
    );
  }

  return (
    <Box
      id="gallery"
      sx={{
        py: 12,
        background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 50%, #0a0a0a 100%)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background decorations */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'radial-gradient(circle at 20% 50%, rgba(0, 102, 204, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(51, 153, 255, 0.1) 0%, transparent 50%)',
          animation: 'pulse 4s ease-in-out infinite',
        }}
      />

      <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <Box textAlign="center" sx={{ mb: 8 }}>
          <Slide direction="down" in={true} timeout={600}>
            <Box sx={{ mb: 3 }}>
              <Chip
                label="Gallery"
                sx={{
                  background: 'linear-gradient(135deg, #0066CC 0%, #3399FF 100%)',
                  color: 'white',
                  fontWeight: 600,
                  px: 3,
                  py: 1,
                  fontSize: '1rem',
                  textTransform: 'uppercase',
                  letterSpacing: 2,
                  boxShadow: '0 8px 25px rgba(0, 102, 204, 0.3)',
                }}
              />
            </Box>
          </Slide>

          <Fade in={true} timeout={800}>
            <Typography
              variant="h2"
              sx={{
                fontSize: { xs: '3rem', md: '5rem', lg: '6rem' },
                fontWeight: 800,
                mb: 3,
                background: 'linear-gradient(135deg, #ffffff 0%, #e2e8f0 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontFamily: '"Space Grotesk", sans-serif',
                textShadow: '0 0 30px rgba(255, 255, 255, 0.1)',
              }}
            >
              Our Journey
            </Typography>
          </Fade>

          <Fade in={true} timeout={1000}>
            <Typography
              variant="h6"
              sx={{
                color: alpha('#ffffff', 0.8),
                maxWidth: 600,
                mx: 'auto',
                lineHeight: 1.6,
                fontSize: '1.2rem',
                fontWeight: 300,
              }}
            >
              Capturing moments that define our community, innovation, and growth
            </Typography>
          </Fade>
        </Box>

        {/* Horizontal Scrolling Image Gallery */}
        {getCurrentImages().length === 0 ? (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: 400,
              mb: 6,
            }}
          >
            <Typography
              variant="h4"
              sx={{
                color: alpha('#ffffff', 0.6),
                mb: 2,
                fontFamily: '"Space Grotesk", sans-serif',
              }}
            >
              {error ? 'Unable to Load Gallery' : 'No Images Available'}
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: alpha('#ffffff', 0.5),
                textAlign: 'center',
                maxWidth: 600,
              }}
            >
              {error
                ? 'Please check your connection and try again later.'
                : 'The admin panel can be used to add event categories and images to the gallery.'
              }
            </Typography>
          </Box>
        ) : (
          <Box
            sx={{
              position: 'relative',
              width: '100vw',
              left: '50%',
              right: '50%',
              marginLeft: '-50vw',
              marginRight: '-50vw',
              height: 500,
              overflow: 'hidden',
              mb: 6,
            }}
          >
          {/* Background faded images scrolling slower */}
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              display: 'flex',
              gap: 4,
              opacity: 0.2,
              filter: 'blur(3px) grayscale(30%)',
              zIndex: 0,
              animation: 'backgroundScroll 50s linear infinite', // Increased speed from 80s to 50s
              '@keyframes backgroundScroll': {
                '0%': {
                  transform: 'translateX(0)',
                },
                '100%': {
                  transform: 'translateX(-50%)',
                },
              },
            }}
          >
            {/* Triple the array for smooth background scrolling */}
            {[...getCurrentImages(), ...getCurrentImages(), ...getCurrentImages()].map((memory, index) => {
              const style = getImageStyle(memory.size);
              return (
                <Box
                  key={`bg-${memory.id}-${index}`}
                  sx={{
                    ...style,
                    flexShrink: 0,
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                >
                  <Box
                    component="img"
                    src={memory.image}
                    alt=""
                    sx={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                    }}
                  />
                </Box>
              );
            })}
          </Box>

          {/* Main scrolling images */}
          <Box
            ref={scrollContainerRef}
            sx={{
              position: 'relative',
              zIndex: 1,
              display: 'flex',
              gap: 3,
              height: '100%',
              overflowX: 'hidden', // Changed from 'auto' to 'hidden'
              overflowY: 'hidden',
              paddingLeft: 4,
              paddingRight: 4,
              willChange: 'scroll-position', // Optimize for scrolling
              backfaceVisibility: 'hidden', // Prevent flickering
              perspective: 1000, // Hardware acceleration
              '&::-webkit-scrollbar': {
                display: 'none',
              },
              scrollbarWidth: 'none',
            }}
          >
            {/* Duplicate the array for seamless infinite scroll */}
            {[...getCurrentImages(), ...getCurrentImages()].map((memory, index) => {
              const style = getImageStyle(memory.size);
              return (
                <Box
                  key={`${memory.id}-${index}`}
                  sx={{
                    ...style,
                    flexShrink: 0,
                    position: 'relative',
                    borderRadius: 0, // Removed corner rounding
                    overflow: 'hidden',
                    cursor: 'pointer',
                    transition: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                    '&:hover': {
                      transform: 'scale(1.05) translateY(-10px)',
                      boxShadow: '0 25px 60px rgba(0, 102, 204, 0.4)',
                      zIndex: 10,
                    },
                  }}
                >
                  <Box
                    component="img"
                    src={memory.image}
                    alt={memory.title}
                    sx={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transition: 'all 0.6s ease',
                    }}
                  />

                  {/* Overlay with gradient */}
                  <Box
                    sx={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      background: 'linear-gradient(45deg, rgba(0, 102, 204, 0.3) 0%, rgba(51, 153, 255, 0.1) 50%, transparent 100%)',
                      opacity: 0.7,
                      transition: 'opacity 0.4s ease',
                    }}
                  />
                </Box>
              );
            })}
          </Box>
        </Box>
        )}

        {/* Event Category Selector */}
        <Container maxWidth="lg" sx={{ mt: 6 }}>
          <Box textAlign="center" sx={{ mb: 4 }}>
            <Typography
              variant="h5"
              sx={{
                color: 'white',
                fontWeight: 600,
                mb: 2,
                fontFamily: '"Space Grotesk", sans-serif',
              }}
            >
              Event Categories
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: alpha('#ffffff', 0.7),
                fontSize: '1rem',
              }}
            >
              Explore memories from different events
            </Typography>
          </Box>

          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: {
                xs: 'repeat(2, 1fr)',
                sm: 'repeat(3, 1fr)',
                md: 'repeat(6, 1fr)',
              },
              gap: 3,
              justifyItems: 'center',
            }}
          >
            {Object.entries(eventCategories).map(([key, event]) => (
              <Fade in={true} timeout={1000 + Object.keys(eventCategories).indexOf(key) * 100} key={key}>
                <Box
                  onClick={() => selectEvent(key)}
                  sx={{
                    width: '100%',
                    minHeight: 120,
                    borderRadius: 3,
                    overflow: 'hidden',
                    cursor: 'pointer',
                    position: 'relative',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    border: selectedEvent === key ? `3px solid ${event.color}` : '3px solid transparent',
                    background: selectedEvent === key
                      ? `linear-gradient(135deg, ${event.color}20 0%, ${event.color}10 100%)`
                      : 'linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.02) 100%)',
                    backdropFilter: 'blur(10px)',
                    '&:hover': {
                      transform: 'scale(1.05) translateY(-4px)',
                      boxShadow: `0 12px 30px ${alpha(event.color, 0.3)}`,
                      border: `3px solid ${event.color}`,
                      background: `linear-gradient(135deg, ${event.color}30 0%, ${event.color}15 100%)`,
                    },
                  }}
                >
                  {/* Event thumbnail - show first image if available */}
                  {event.images.length > 0 && (
                    <Box
                      sx={{
                        width: '100%',
                        height: 80,
                        position: 'relative',
                        overflow: 'hidden',
                      }}
                    >
                      <Box
                        component="img"
                        src={event.images[0].image}
                        alt={event.name}
                        sx={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          transition: 'all 0.3s ease',
                          filter: selectedEvent === key ? 'brightness(1.1)' : 'brightness(0.8)',
                        }}
                      />

                      {/* Event overlay */}
                      <Box
                        sx={{
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          width: '100%',
                          height: '100%',
                          background: `linear-gradient(45deg, ${alpha(event.color, 0.6)} 0%, transparent 100%)`,
                        }}
                      />
                    </Box>
                  )}

                  {/* Event info */}
                  <Box sx={{ p: 2, textAlign: 'center' }}>
                    <Typography
                      variant="body2"
                      sx={{
                        color: 'white',
                        fontWeight: 700,
                        fontSize: '0.9rem',
                        mb: 0.5,
                        fontFamily: '"Space Grotesk", sans-serif',
                      }}
                    >
                      {event.name}
                    </Typography>
                    <Typography
                      variant="caption"
                      sx={{
                        color: alpha('#ffffff', 0.7),
                        fontSize: '0.7rem',
                      }}
                    >
                      {event.images.length} {event.images.length === 1 ? 'image' : 'images'}
                    </Typography>
                  </Box>

                  {/* Active indicator */}
                  {selectedEvent === key && (
                    <Box
                      sx={{
                        position: 'absolute',
                        top: 8,
                        right: 8,
                        width: 12,
                        height: 12,
                        borderRadius: '50%',
                        background: event.color,
                        boxShadow: `0 0 15px ${alpha(event.color, 0.6)}`,
                        animation: 'pulse 2s ease-in-out infinite',
                        '@keyframes pulse': {
                          '0%': {
                            boxShadow: `0 0 15px ${alpha(event.color, 0.6)}`,
                          },
                          '50%': {
                            boxShadow: `0 0 25px ${alpha(event.color, 0.8)}`,
                          },
                          '100%': {
                            boxShadow: `0 0 15px ${alpha(event.color, 0.6)}`,
                          },
                        },
                      }}
                    />
                  )}
                </Box>
              </Fade>
            ))}
          </Box>
        </Container>
      </Container>
    </Box>
  );
};

export default Gallery;
