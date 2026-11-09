import React, { useRef, useEffect } from 'react';
import {
  Box,
  Typography,
} from '@mui/material';

interface SponsorItem {
  title: string;
  logo?: string;
  logos?: string[];
  isGroup?: boolean;
}

const StepIntoIndustry: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | null>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  const sponsors: SponsorItem[] = [
    { title: 'Organized By', logo: '/images/projects/Step into industry/kdu_ieee logo.png' },
    { title: 'Platinum Sponsor', logo: '/images/projects/Step into industry/Singer_SL_Logo.png' },
    { title: 'Silver Sponsor', logo: '/images/projects/Step into industry/WSO2_logo.png' },
    { title: 'Bronze Sponsors', logos: [
      '/images/projects/Step into industry/cardealz.png',
      '/images/projects/Step into industry/o2store.png'
    ], isGroup: true },
    { title: 'Eco-System Partner', logo: '/images/projects/Step into industry/ecosystem.png' },
    { title: 'Official Gift Partner', logo: '/images/projects/Step into industry/pearlbay.png' },
    { title: 'Knowledge Partners', logos: [
      '/images/projects/Step into industry/lseg.png',
      '/images/projects/Step into industry/idea8.png',
      '/images/projects/Step into industry/ESlankalogo.jpg',
      '/images/projects/Step into industry/Zebra.jpg',
      '/images/projects/Step into industry/articom.png',
      '/images/projects/Step into industry/vsis.jpg',
      '/images/projects/Step into industry/sentrylabs.png',
      '/images/projects/Step into industry/fcodelabs.png',
      '/images/projects/Step into industry/asyncdot.jpg',
    ], isGroup: true },
    { title: 'Tech Community Partner', logo: '/images/projects/Step into industry/gdglk.jpeg' },
    { title: 'Digital Media Partner', logo: '/images/projects/Step into industry/hacksl.png' },
  ];

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    const scrollSpeed = 2;
    const scroll = () => {
      if (!isDragging.current) {
        scrollContainer.scrollLeft += scrollSpeed;
        
        // Seamless loop: reset when reaching halfway point
        if (scrollContainer.scrollLeft >= scrollContainer.scrollWidth / 2) {
          scrollContainer.scrollLeft = 0;
        }
      }
      animationRef.current = requestAnimationFrame(scroll);
    };

    animationRef.current = requestAnimationFrame(scroll);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  const handleMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    startX.current = e.pageX - (scrollRef.current?.offsetLeft || 0);
    scrollLeft.current = scrollRef.current?.scrollLeft || 0;
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - (scrollRef.current.offsetLeft || 0);
    const walk = (x - startX.current) * 2;
    scrollRef.current.scrollLeft = scrollLeft.current - walk;
  };

  const handleMouseLeave = () => {
    isDragging.current = false;
  };

  return (
    <>
      {/* Thank You Section Divider */}
      <Box
        sx={{
          width: '100%',
          py: 6,
          background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
          position: 'relative',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: '-50%',
            width: '200%',
            height: '100%',
            background: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.1) 10px, rgba(255,255,255,0.1) 20px)',
          },
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 2,
            zIndex: 1,
          }}
        >
          <Box
            sx={{
              width: { xs: 60, md: 100 },
              height: '2px',
              background: 'linear-gradient(90deg, transparent, #0066CC, transparent)',
            }}
          />
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 2,
              px: 3,
              py: 1.5,
              background: 'rgba(255, 255, 255, 0.9)',
              borderRadius: 50,
              boxShadow: '0 4px 20px rgba(0, 102, 204, 0.2)',
            }}
          >
            <Box
              sx={{
                width: 10,
                height: 10,
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #0066CC, #0033CC)',
                animation: 'pulse 2s infinite',
                '@keyframes pulse': {
                  '0%, 100%': { opacity: 1, transform: 'scale(1)' },
                  '50%': { opacity: 0.5, transform: 'scale(1.2)' },
                },
              }}
            />
            <Typography
              sx={{
                fontSize: { xs: '0.875rem', md: '1rem' },
                fontWeight: 600,
                background: 'linear-gradient(135deg, #0066CC, #0033CC)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                letterSpacing: '0.5px',
              }}
            >
              THANK YOU
            </Typography>
            <Box
              sx={{
                width: 10,
                height: 10,
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #0066CC, #0033CC)',
                animation: 'pulse 2s infinite',
                '@keyframes pulse': {
                  '0%, 100%': { opacity: 1, transform: 'scale(1)' },
                  '50%': { opacity: 0.5, transform: 'scale(1.2)' },
                },
              }}
            />
          </Box>
          <Box
            sx={{
              width: { xs: 60, md: 100 },
              height: '2px',
              background: 'linear-gradient(90deg, transparent, #0066CC, transparent)',
            }}
          />
        </Box>
      </Box>

      {/* Main Section */}
      <Box
        id="step-into-industry"
        sx={{
          minHeight: 'auto',
          background: '#ffffff',
          py: { xs: 4, md: 6 },
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Static Logo and Title at Top */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 3,
            mb: 6,
            px: 2,
            position: 'relative',
            overflow: 'hidden',
            '&::after': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: '-30%',
              width: '30%',
              height: '100%',
              background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.6), transparent)',
              animation: 'shine 10s infinite',
              pointerEvents: 'none',
              zIndex: 10,
            },
            '@keyframes shine': {
              '0%': {
                left: '-30%',
              },
              '20%': {
                left: '100%',
              },
              '100%': {
                left: '100%',
              },
            },
          }}
        >
          <Box
            component="img"
            src="/images/projects/Step into industry/stpeintoindustry4.0.png"
            alt="Step Into Industry 4.0"
            sx={{
              width: { xs: 80, md: 120 },
              height: { xs: 80, md: 120 },
              objectFit: 'contain',
              display: 'block',
            }}
          />
          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: { xs: 1, sm: 2 }, alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' }}>
            <Typography
              variant="h3"
              sx={{
                fontWeight: 700,
                background: 'linear-gradient(90deg, #003366, #000000)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontSize: { xs: '1.75rem', md: '3rem' },
                textAlign: 'center',
              }}
            >
              STEP INTO
            </Typography>
            <Typography
              variant="h3"
              sx={{
                fontWeight: 700,
                color: '#DC143C',
                fontSize: { xs: '1.75rem', md: '3rem' },
                textAlign: 'center',
              }}
            >
              INDUSTRY 4.0
            </Typography>
          </Box>
        </Box>

        {/* Continuous Horizontal Scrolling Marquee */}
        <Box
          ref={scrollRef}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          sx={{
            width: '100%',
            overflowX: 'auto',
            overflowY: 'hidden',
            py: 4,
            background: '#f8f9fa',
            position: 'relative',
            cursor: isDragging.current ? 'grabbing' : 'grab',
            userSelect: 'none',
            '&::-webkit-scrollbar': {
              display: 'none',
            },
            scrollbarWidth: 'none',
            '&::before, &::after': {
              content: '""',
              position: 'absolute',
              top: 0,
              width: '100px',
              height: '100%',
              zIndex: 2,
              pointerEvents: 'none',
            },
            '&::before': {
              left: 0,
              background: 'linear-gradient(to right, #f8f9fa, transparent)',
            },
            '&::after': {
              right: 0,
              background: 'linear-gradient(to left, #f8f9fa, transparent)',
            },
          }}
        >
          <Box
            sx={{
              display: 'flex',
              gap: 4,
              width: 'max-content',
            }}
          >
            {/* First set of sponsors */}
            {sponsors.map((sponsor, index) => (
              sponsor.isGroup ? (
                <Box
                  key={`sponsor-1-${index}`}
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    minWidth: { xs: '400px', md: '600px' },
                    px: 2,
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: { xs: '0.75rem', md: '0.875rem' },
                      fontWeight: 600,
                      color: '#666',
                      textTransform: 'uppercase',
                      mb: 3,
                      textAlign: 'center',
                      letterSpacing: '0.5px',
                    }}
                  >
                    {sponsor.title}
                  </Typography>
                  <Box
                    sx={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: 3,
                      justifyContent: 'center',
                      alignItems: 'center',
                      maxWidth: '100%',
                    }}
                  >
                    {sponsor.logos?.map((logo, logoIdx) => (
                      <Box
                        key={logoIdx}
                        component="img"
                        src={logo}
                        alt={`${sponsor.title} ${logoIdx + 1}`}
                        sx={{
                          width: { xs: '80px', md: '100px' },
                          height: { xs: '60px', md: '80px' },
                          objectFit: 'contain',
                        }}
                      />
                    ))}
                  </Box>
                </Box>
              ) : (
                <Box
                  key={`sponsor-1-${index}`}
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    minWidth: { xs: '200px', md: '250px' },
                    px: 2,
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: { xs: '0.75rem', md: '0.875rem' },
                      fontWeight: 600,
                      color: '#666',
                      textTransform: 'uppercase',
                      mb: 2,
                      textAlign: 'center',
                      letterSpacing: '0.5px',
                    }}
                  >
                    {sponsor.title}
                  </Typography>
                  <Box
                    component="img"
                    src={sponsor.logo}
                    alt={sponsor.title}
                    sx={{
                      width: '100%',
                      maxWidth: { xs: '150px', md: '200px' },
                      height: { xs: '80px', md: '100px' },
                      objectFit: 'contain',
                    }}
                  />
                </Box>
              )
            ))}
            {/* Duplicate set for seamless loop */}
            {sponsors.map((sponsor, index) => (
              sponsor.isGroup ? (
                <Box
                  key={`sponsor-2-${index}`}
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    minWidth: { xs: '400px', md: '600px' },
                    px: 2,
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: { xs: '0.75rem', md: '0.875rem' },
                      fontWeight: 600,
                      color: '#666',
                      textTransform: 'uppercase',
                      mb: 3,
                      textAlign: 'center',
                      letterSpacing: '0.5px',
                    }}
                  >
                    {sponsor.title}
                  </Typography>
                  <Box
                    sx={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: 3,
                      justifyContent: 'center',
                      alignItems: 'center',
                      maxWidth: '100%',
                    }}
                  >
                    {sponsor.logos?.map((logo, logoIdx) => (
                      <Box
                        key={logoIdx}
                        component="img"
                        src={logo}
                        alt={`${sponsor.title} ${logoIdx + 1}`}
                        sx={{
                          width: { xs: '80px', md: '100px' },
                          height: { xs: '60px', md: '80px' },
                          objectFit: 'contain',
                        }}
                      />
                    ))}
                  </Box>
                </Box>
              ) : (
                <Box
                  key={`sponsor-2-${index}`}
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    minWidth: { xs: '200px', md: '250px' },
                    px: 2,
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: { xs: '0.75rem', md: '0.875rem' },
                      fontWeight: 600,
                      color: '#666',
                      textTransform: 'uppercase',
                      mb: 2,
                      textAlign: 'center',
                      letterSpacing: '0.5px',
                    }}
                  >
                    {sponsor.title}
                  </Typography>
                  <Box
                    component="img"
                    src={sponsor.logo}
                    alt={sponsor.title}
                    sx={{
                      width: '100%',
                      maxWidth: { xs: '150px', md: '200px' },
                      height: { xs: '80px', md: '100px' },
                      objectFit: 'contain',
                    }}
                  />
                </Box>
              )
            ))}
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default StepIntoIndustry;
