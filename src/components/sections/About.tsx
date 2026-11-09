import React from 'react';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Button,
  Chip,
  useTheme,
  alpha,
  Fade,
  Slide,
} from '@mui/material';
import {
  Rocket,
} from '@mui/icons-material';

const About: React.FC = () => {
  const theme = useTheme();

  const societies = [
    { 
      name: 'CS', 
      fullName: 'Computer Society', 
      logo: '/images/chapters/IEEE CS KDU Logo.png',
      color: '#3B82F6',
      description: 'Advancing computing and information technology'
    },
    { 
      name: 'EMBS', 
      fullName: 'Engineering in Medicine and Biology Society', 
      logo: '/images/chapters/KDU EMBS LOGO coloured.png',
      color: '#10B981',
      description: 'Bridging engineering and medical sciences'
    },
    { 
      name: 'WIE', 
      fullName: 'Women in Engineering', 
      logo: '/images/chapters/WIE Logo Rebranding(Trans).png',
      color: '#EC4899',
      description: 'Empowering women in engineering fields'
    },
    { 
      name: 'PES', 
      fullName: 'Power & Energy Society', 
      logo: '/images/chapters/PES.png',
      color: '#F59E0B',
      description: 'Focusing on power and energy technologies'
    },
    { 
      name: 'ComSoc', 
      fullName: 'Communications Society', 
      logo: '/images/chapters/kducomsoc.png',
      color: '#8B5CF6',
      description: 'Advancing communication technologies'
    }
  ];

  return (
    <Box
      id="about"
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
          top: 80,
          right: 40,
          width: 256,
          height: 256,
          borderRadius: '50%',
          background: 'linear-gradient(135deg, rgba(0, 102, 204, 0.05), rgba(51, 153, 255, 0.1))',
          filter: 'blur(60px)',
          animation: 'float 8s ease-in-out infinite',
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          bottom: 80,
          left: 40,
          width: 320,
          height: 320,
          borderRadius: '50%',
          background: 'linear-gradient(135deg, rgba(255, 215, 0, 0.05), rgba(255, 165, 0, 0.1))',
          filter: 'blur(60px)',
          animation: 'float 10s ease-in-out infinite reverse',
        }}
      />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <Box textAlign="center" sx={{ mb: 12 }}>
          <Slide direction="down" in={true} timeout={600}>
            <Box sx={{ mb: 3 }}>
              <Chip
                label="About Us"
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
                mb: 3,
                background: 'linear-gradient(135deg, #0066CC 0%, #3399FF 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontFamily: '"Space Grotesk", sans-serif',
              }}
            >
              Who We Are
            </Typography>
          </Fade>

          <Fade in={true} timeout={1000}>
            <Typography
              variant="h6"
              sx={{
                color: theme.palette.text.secondary,
                maxWidth: 600,
                mx: 'auto',
                lineHeight: 1.6,
                fontSize: '1.25rem',
                fontWeight: 400,
              }}
            >
              Empowering the next generation of technology leaders since 2016
            </Typography>
          </Fade>
        </Box>

        {/* Team Image Section */}
        <Box sx={{ mb: 12 }}>
          <Fade in={true} timeout={1200}>
            <Box
              sx={{
                position: 'relative',
                borderRadius: 4,
                overflow: 'hidden',
                boxShadow: '0 20px 40px rgba(0, 102, 204, 0.15)',
                maxWidth: 1200, // Increased max width
                mx: 'auto', // Center the image
                '&:hover': {
                  transform: 'translateY(-8px)',
                  boxShadow: '0 25px 50px rgba(0, 102, 204, 0.2)',
                  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                },
              }}
            >
              <Box
                component="img"
                src="/images/IEEESBKDUEXCO26.jpg"
                alt="IEEE KDU Executive Committee Team"
                sx={{
                  width: '100%',
                  height: { xs: 400, sm: 500, md: 600, lg: 700 }, // Increased height
                  objectFit: 'cover',
                  display: 'block',
                }}
              />
              {/* Overlay with gradient */}
              <Box
                sx={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  background: 'linear-gradient(transparent, rgba(0, 102, 204, 0.8))',
                  color: 'white',
                  p: 4,
                  textAlign: 'center', // Center align overlay text
                }}
              >
                <Typography
                  variant="h4" // Increased size
                  sx={{
                    fontWeight: 700,
                    mb: 2, // Increased margin
                    fontFamily: '"Space Grotesk", sans-serif',
                  }}
                >
                  IEEE KDU Executive Committee 2026
                </Typography>
                <Typography
                  variant="h6" // Increased size
                  sx={{
                    opacity: 0.9,
                    fontWeight: 400,
                  }}
                >
                  Leading innovation and excellence in engineering education
                </Typography>
              </Box>
            </Box>
          </Fade>
        </Box>

        {/* Simplified Content Section */}
        <Box sx={{ mb: 12, textAlign: 'center', maxWidth: 800, mx: 'auto' }}>
          <Fade in={true} timeout={1400}>
            <Box>
              {/* Main Description */}
              <Typography
                variant="h6"
                sx={{
                  color: theme.palette.text.secondary,
                  lineHeight: 1.8,
                  mb: 4,
                  fontSize: '1.2rem',
                  fontWeight: 400,
                }}
              >
                IEEE Student Branch of General Sir John Kotelawala Defence University was
                established in <Box component="span" sx={{ fontWeight: 700, color: '#0066CC' }}>2016</Box> as 
                a student branch of the mother body.
              </Typography>
              
              <Typography
                variant="h6"
                sx={{
                  color: theme.palette.text.secondary,
                  lineHeight: 1.8,
                  mb: 6,
                  fontSize: '1.2rem',
                  fontWeight: 400,
                }}
              >
                Since then, we have been volunteering and carrying out events to provide facilities to students in
                the fields of <Box component="span" sx={{ fontWeight: 600, color: '#0066CC' }}>
                  Computer Science, Engineering, Telecommunication and Robotics
                </Box>. We are here to enhance your knowledge and skills in technology.
              </Typography>

              {/* Simple Stats */}
              <Box sx={{ display: 'flex', justifyContent: 'center', gap: 6, mb: 6 }}>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="h3" sx={{ fontWeight: 700, color: '#0066CC', mb: 1 }}>
                    10+
                  </Typography>
                  <Typography variant="body1" sx={{ color: theme.palette.text.secondary }}>
                    Years Active
                  </Typography>
                </Box>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="h3" sx={{ fontWeight: 700, color: '#0066CC', mb: 1 }}>
                    5
                  </Typography>
                  <Typography variant="body1" sx={{ color: theme.palette.text.secondary }}>
                    Societies
                  </Typography>
                </Box>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="h3" sx={{ fontWeight: 700, color: '#0066CC', mb: 1 }}>
                    220+
                  </Typography>
                  <Typography variant="body1" sx={{ color: theme.palette.text.secondary }}>
                    Members
                  </Typography>
                </Box>
              </Box>

              {/* Call to Action */}
              <Button
                variant="contained"
                size="large"
                startIcon={<Rocket />}
                onClick={() => document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' })}
                sx={{
                  py: 2,
                  px: 6,
                  fontSize: '1.1rem',
                  borderRadius: 3,
                  background: 'linear-gradient(135deg, #0066CC 0%, #3399FF 100%)',
                  boxShadow: '0 8px 25px rgba(0, 102, 204, 0.3)',
                  '&:hover': {
                    background: 'linear-gradient(135deg, #003366 0%, #0066CC 100%)',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 12px 35px rgba(0, 102, 204, 0.4)',
                  },
                }}
              >
                Explore Our Projects
              </Button>
            </Box>
          </Fade>
        </Box>

        {/* Societies Section */}
        <Box>
          <Fade in={true} timeout={1600}>
            <Box textAlign="center" sx={{ mb: 8 }}>
              <Typography
                variant="h3"
                sx={{
                  fontWeight: 700,
                  mb: 2,
                  color: theme.palette.text.primary,
                  fontFamily: '"Poppins", sans-serif',
                }}
              >
                Our Societies & Chapters
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  color: theme.palette.text.secondary,
                  fontSize: '1.1rem',
                }}
              >
                Diverse communities fostering specialized knowledge and innovation
              </Typography>
            </Box>
          </Fade>
        </Box>
      </Container>

      {/* Full Width Marquee Section */}
      <Box
        sx={{
          width: '100vw',
          position: 'relative',
          left: '50%',
          right: '50%',
          marginLeft: '-50vw',
          marginRight: '-50vw',
          overflow: 'hidden',
          py: 4,
          '&:hover .marquee-content': {
            animationPlayState: 'paused',
          },
        }}
      >
        <Box
          className="marquee-content"
          sx={{
            display: 'flex',
            gap: { xs: 2, sm: 3, md: 4 },
            animation: 'marquee 25s linear infinite',
            '&:hover': {
              animationPlayState: 'paused',
            },
            '@keyframes marquee': {
              '0%': {
                transform: 'translateX(0)',
              },
              '100%': {
                transform: 'translateX(-50%)',
              },
            },
          }}
        >
          {/* First set of societies */}
          {societies.map((society, index) => (
            <Box
              key={`first-${index}`}
              sx={{
                minWidth: { xs: 240, sm: 260, md: 280, lg: 300 },
                flexShrink: 0,
              }}
            >
              <Card
                sx={{
                  height: { xs: 240, sm: 260, md: 280 },
                  borderRadius: 4,
                  border: '1px solid rgba(0, 0, 0, 0.08)',
                  position: 'relative',
                  overflow: 'hidden',
                  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                  mx: 1,
                  '&:hover': {
                    transform: 'translateY(-8px) scale(1.02)',
                    boxShadow: `0 16px 32px ${alpha(society.color, 0.2)}`,
                    '& .society-icon': {
                      transform: 'scale(1.1) rotate(5deg)',
                      backgroundColor: society.color,
                    },
                    '& .hover-border': {
                      transform: 'scaleX(1)',
                    },
                  },
                }}
              >
                {/* Background gradient */}
                <Box
                  sx={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    width: 80,
                    height: 80,
                    background: `linear-gradient(135deg, ${society.color}20, ${society.color}40)`,
                    borderRadius: '50%',
                    filter: 'blur(20px)',
                    opacity: 0.3,
                  }}
                />

                <CardContent sx={{ p: { xs: 2, sm: 3 }, textAlign: 'center', position: 'relative', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  {/* Logo */}
                  <Box
                    className="society-icon"
                    sx={{
                      width: { xs: 60, sm: 70, md: 80 },
                      height: { xs: 60, sm: 70, md: 80 },
                      mx: 'auto',
                      mb: { xs: 2, sm: 3 },
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: '50%',
                      backgroundColor: alpha(society.color, 0.1),
                      transition: 'all 0.4s ease',
                    }}
                  >
                    <Box
                      component="img"
                      src={society.logo}
                      alt={`${society.name} Logo`}
                      sx={{
                        width: { xs: 45, sm: 55, md: 60 },
                        height: { xs: 45, sm: 55, md: 60 },
                        objectFit: 'contain',
                      }}
                    />
                  </Box>

                  {/* Content */}
                  <Typography
                    variant="h5"
                    sx={{
                      fontWeight: 700,
                      mb: { xs: 1, sm: 2 },
                      color: theme.palette.text.primary,
                      fontSize: { xs: '1.2rem', sm: '1.3rem', md: '1.5rem' },
                    }}
                  >
                    {society.name}
                  </Typography>
                  
                  <Typography
                    variant="body1"
                    sx={{
                      color: theme.palette.text.secondary,
                      fontSize: { xs: '0.85rem', sm: '0.9rem', md: '1rem' },
                      lineHeight: 1.4,
                      mb: { xs: 1, sm: 2 },
                      fontWeight: 500,
                    }}
                  >
                    {society.fullName}
                  </Typography>

                  <Typography
                    variant="body2"
                    sx={{
                      color: theme.palette.text.secondary,
                      fontSize: { xs: '0.75rem', sm: '0.8rem', md: '0.9rem' },
                      lineHeight: 1.4,
                      display: 'block',
                    }}
                  >
                    {society.description}
                  </Typography>
                </CardContent>

                {/* Hover effect border */}
                <Box
                  className="hover-border"
                  sx={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    width: '100%',
                    height: 4,
                    background: `linear-gradient(90deg, ${society.color}, ${society.color}80)`,
                    transform: 'scaleX(0)',
                    transformOrigin: 'left',
                    transition: 'transform 0.4s ease',
                  }}
                />
              </Card>
            </Box>
          ))}
          
          {/* Duplicate set for seamless loop */}
          {societies.map((society, index) => (
            <Box
              key={`second-${index}`}
              sx={{
                minWidth: { xs: 240, sm: 260, md: 280, lg: 300 },
                flexShrink: 0,
              }}
            >
              <Card
                sx={{
                  height: { xs: 240, sm: 260, md: 280 },
                  borderRadius: 4,
                  border: '1px solid rgba(0, 0, 0, 0.08)',
                  position: 'relative',
                  overflow: 'hidden',
                  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                  mx: 1,
                  '&:hover': {
                    transform: 'translateY(-8px) scale(1.02)',
                    boxShadow: `0 16px 32px ${alpha(society.color, 0.2)}`,
                    '& .society-icon': {
                      transform: 'scale(1.1) rotate(5deg)',
                      backgroundColor: society.color,
                    },
                    '& .hover-border': {
                      transform: 'scaleX(1)',
                    },
                  },
                }}
              >
                {/* Background gradient */}
                <Box
                  sx={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    width: 80,
                    height: 80,
                    background: `linear-gradient(135deg, ${society.color}20, ${society.color}40)`,
                    borderRadius: '50%',
                    filter: 'blur(20px)',
                    opacity: 0.3,
                  }}
                />

                <CardContent sx={{ p: { xs: 2, sm: 3 }, textAlign: 'center', position: 'relative', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  {/* Logo */}
                  <Box
                    className="society-icon"
                    sx={{
                      width: { xs: 60, sm: 70, md: 80 },
                      height: { xs: 60, sm: 70, md: 80 },
                      mx: 'auto',
                      mb: { xs: 2, sm: 3 },
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: '50%',
                      backgroundColor: alpha(society.color, 0.1),
                      transition: 'all 0.4s ease',
                    }}
                  >
                    <Box
                      component="img"
                      src={society.logo}
                      alt={`${society.name} Logo`}
                      sx={{
                        width: { xs: 45, sm: 55, md: 60 },
                        height: { xs: 45, sm: 55, md: 60 },
                        objectFit: 'contain',
                      }}
                    />
                  </Box>

                  {/* Content */}
                  <Typography
                    variant="h5"
                    sx={{
                      fontWeight: 700,
                      mb: { xs: 1, sm: 2 },
                      color: theme.palette.text.primary,
                      fontSize: { xs: '1.2rem', sm: '1.3rem', md: '1.5rem' },
                    }}
                  >
                    {society.name}
                  </Typography>
                  
                  <Typography
                    variant="body1"
                    sx={{
                      color: theme.palette.text.secondary,
                      fontSize: { xs: '0.85rem', sm: '0.9rem', md: '1rem' },
                      lineHeight: 1.4,
                      mb: { xs: 1, sm: 2 },
                      fontWeight: 500,
                    }}
                  >
                    {society.fullName}
                  </Typography>

                  <Typography
                    variant="body2"
                    sx={{
                      color: theme.palette.text.secondary,
                      fontSize: { xs: '0.75rem', sm: '0.8rem', md: '0.9rem' },
                      lineHeight: 1.4,
                      display: 'block',
                    }}
                  >
                    {society.description}
                  </Typography>
                </CardContent>

                {/* Hover effect border */}
                <Box
                  className="hover-border"
                  sx={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    width: '100%',
                    height: 4,
                    background: `linear-gradient(90deg, ${society.color}, ${society.color}80)`,
                    transform: 'scaleX(0)',
                    transformOrigin: 'left',
                    transition: 'transform 0.4s ease',
                  }}
                />
              </Card>
            </Box>
          ))}
        </Box>
      </Box>

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
      </Container>
    </Box>
  );
};

export default About;
