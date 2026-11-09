import React, { useState, useEffect, useRef } from 'react';
import {
  Box,
  Container,
  Typography,
  Fade,
  Slide,
  alpha,
} from '@mui/material';
import {
  School,
  Group,
  EmojiEvents,
  KeyboardArrowDown,
} from '@mui/icons-material';
import SideRays from '../SideRays';
import BorderGlow from '../BorderGlow';

const useCounterAnimation = (endValue: number, duration: number = 2000) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const countRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.5 }
    );

    if (countRef.current) {
      observer.observe(countRef.current);
    }

    return () => observer.disconnect();
  }, [isVisible]);

  useEffect(() => {
    if (!isVisible) return;

    let startTime: number;
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = (currentTime - startTime) / duration;

      if (progress < 1) {
        setCount(Math.floor(endValue * progress));
        requestAnimationFrame(animate);
      } else {
        setCount(endValue);
      }
    };

    requestAnimationFrame(animate);
  }, [isVisible, endValue, duration]);

  return { count, countRef };
};

const AnimatedCounter: React.FC<{ 
  endValue: number; 
  suffix?: string; 
  colors?: string[];
  icon: React.ReactNode;
  label: string;
}> = ({ 
  endValue, 
  suffix = '', 
  colors = ['#c084fc', '#f472b6', '#38bdf8'], 
  icon, 
  label 
}) => {
  const { count, countRef } = useCounterAnimation(endValue, 2500);
  
  return (
    <Box ref={countRef} sx={{ height: '100%' }}>
      <BorderGlow
        edgeSensitivity={30}
        glowColor="40 80 80"
        backgroundColor="#120F17"
        borderRadius={28}
        glowRadius={40}
        glowIntensity={1}
        coneSpread={25}
        animated={false}
        colors={colors}
      >
        <Box 
          sx={{ 
            textAlign: 'center', 
            py: 5, 
            px: 2, 
            height: '100%', 
            display: 'flex', 
            flexDirection: 'column', 
            justifyContent: 'center', 
            alignItems: 'center' 
          }}
        >
          <Box
            sx={{
              color: '#ffffff',
              mb: 3,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              '& .MuiSvgIcon-root': { 
                fontSize: '2.8rem',
                filter: 'drop-shadow(0px 4px 12px rgba(255, 255, 255, 0.4))'
              },
            }}
          >
            {icon}
          </Box>
          <Typography
            variant="h3"
            sx={{
              color: 'white',
              fontWeight: 700,
              mb: 1,
              fontFamily: '"Space Grotesk", sans-serif',
            }}
          >
            {count}{suffix}
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: alpha('#ffffff', 0.8),
              fontWeight: 500,
              textTransform: 'uppercase',
              letterSpacing: 1,
            }}
          >
            {label}
          </Typography>
        </Box>
      </BorderGlow>
    </Box>
  );
};

const Hero: React.FC = () => {
  return (
    <Box
      id="home"
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
        background: '#040b16', 
      }}
    >
      <Box 
        sx={{ 
          position: 'absolute', 
          top: 0, 
          left: 0, 
          right: 0, 
          bottom: 0, 
          zIndex: 0,
          opacity: 0.8, 
        }}
      >
        <SideRays
          speed={2.5}
          rayColor1="#3399FF" 
          rayColor2="#a7e9ff" 
          intensity={2}
          spread={2}
          tilt={0}
          saturation={1.5}
          blend={0.75}
          falloff={1.6}
          opacity={1}
        />
      </Box>

      <Box
        sx={{
          position: 'absolute',
          top: '20%',
          left: '-10%',
          width: 500,
          height: 500,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(51, 153, 255, 0.15) 0%, transparent 70%)',
          filter: 'blur(60px)',
          animation: 'float 8s ease-in-out infinite',
          zIndex: 0,
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          bottom: '-10%',
          right: '-5%',
          width: 600,
          height: 600,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(8, 200, 234, 0.1) 0%, transparent 70%)',
          filter: 'blur(80px)',
          animation: 'float 10s ease-in-out infinite reverse',
          zIndex: 0,
        }}
      />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <Box textAlign="center">
          <Slide direction="down" in={true} timeout={800}>
            <Box sx={{ mb: -1, mt: 6 }}>
              <Box sx={{ position: 'relative', display: 'inline-block' }}>
                <Box
                  component="img"
                  src="/images/logo/ieee sb logo.png"
                  alt="IEEE KDU Logo"
                  sx={{
                    width: { xs: 200, sm: 250, md: 300 },
                    height: 'auto',
                    maxWidth: 400,
                    margin: '0 auto 0.5rem',
                    display: 'block',
                    objectFit: 'contain',
                    animation: 'float 6s ease-in-out infinite',
                    filter: 'drop-shadow(0 10px 30px rgba(51, 153, 255, 0.2))',
                  }}
                />
              </Box>
            </Box>
          </Slide>

          <Fade in={true} timeout={1000}>
            <Box sx={{ color: 'white', mb: 6 }}>
              <Typography
                variant="h1"
                sx={{
                  fontSize: { xs: '3rem', md: '5rem', lg: '6rem' },
                  fontWeight: 700,
                  mb: 2,
                  background: 'linear-gradient(135deg, #ffffff 0%, #3399FF 100%)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  lineHeight: 1.1,
                }}
              >
                IEEE Student Branch
              </Typography>
              
              <Typography
                variant="h4"
                sx={{
                  fontSize: { xs: '1.2rem', md: '2rem', lg: '2.5rem' },
                  fontWeight: 300,
                  mb: 4,
                  opacity: 0.9,
                  fontFamily: '"Poppins", sans-serif',
                }}
              >
                General Sir John Kotelawala Defence University
              </Typography>
              
              <Typography
                variant="h6"
                sx={{
                  fontSize: { xs: '1rem', md: '1.25rem', lg: '1.5rem' },
                  mb: 6,
                  color: 'rgba(255, 255, 255, 0.8)',
                  maxWidth: 800,
                  mx: 'auto',
                  lineHeight: 1.6,
                  fontWeight: 300,
                }}
              >
                Welcome you all and stay with us to endeavor the future with IEEE KDU.
                <Box component="span" sx={{ display: 'block', mt: 1, color: '#3399FF', fontWeight: 500 }}>
                  Empowering innovation since 2016
                </Box>
              </Typography>
            </Box>
          </Fade>

          <Fade in={true} timeout={1500}>
            <Box 
              sx={{ 
                display: 'grid',
                gridTemplateColumns: {
                  xs: '1fr',
                  sm: 'repeat(3, 1fr)'
                },
                gap: 4,
                justifyContent: 'center',
                maxWidth: 800,
                mx: 'auto',
                mb: { xs: 8, sm: 10, md: 12 },
              }}
            >
              <Box sx={{ height: '100%' }}>
                <BorderGlow
                  edgeSensitivity={30}
                  glowColor="40 80 80"
                  backgroundColor="#120F17"
                  borderRadius={28}
                  glowRadius={40}
                  glowIntensity={1}
                  coneSpread={25}
                  animated={false}
                  colors={['#FCD34D', '#F59E0B', '#D97706']} // Gold/Yellow theme for established year
                >
                  <Box 
                    sx={{ 
                      textAlign: 'center', 
                      py: 5, 
                      px: 2, 
                      height: '100%', 
                      display: 'flex', 
                      flexDirection: 'column', 
                      justifyContent: 'center', 
                      alignItems: 'center' 
                    }}
                  >
                    <Box
                      sx={{
                        color: '#ffffff',
                        mb: 3,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        '& .MuiSvgIcon-root': { 
                          fontSize: '2.8rem',
                          filter: 'drop-shadow(0px 4px 12px rgba(255, 255, 255, 0.4))'
                        },
                      }}
                    >
                      <School />
                    </Box>
                    <Typography
                      variant="h3"
                      sx={{
                        color: 'white',
                        fontWeight: 700,
                        mb: 1,
                        fontFamily: '"Space Grotesk", sans-serif',
                      }}
                    >
                      2016
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: alpha('#ffffff', 0.8),
                        fontWeight: 500,
                        textTransform: 'uppercase',
                        letterSpacing: 1,
                      }}
                    >
                      Established
                    </Typography>
                  </Box>
                </BorderGlow>
              </Box>

              <AnimatedCounter
                endValue={220}
                suffix="+"
                colors={['#60A5FA', '#3B82F6', '#2563EB']} // Blue theme
                icon={<Group />}
                label="Active Members"
              />

              <AnimatedCounter
                endValue={50}
                suffix="+"
                colors={['#F472B6', '#E11D48', '#BE123C']} // Pink/Red theme
                icon={<EmojiEvents />}
                label="Events Hosted"
              />
            </Box>
          </Fade>

          <Box
            sx={{
              position: 'absolute',
              bottom: { xs: 20, sm: 25, md: 30 },
              left: '50%',
              transform: 'translateX(-50%)',
              color: 'white',
              cursor: 'pointer',
              animation: 'bounce 2s infinite',
              opacity: 0.8,
              zIndex: 10,
              '&:hover': { opacity: 1 },
              '@keyframes bounce': {
                '0%, 20%, 53%, 80%, 100%': {
                  transform: 'translateX(-50%) translateY(0)',
                },
                '40%, 43%': {
                  transform: 'translateX(-50%) translateY(-8px)',
                },
                '70%': {
                  transform: 'translateX(-50%) translateY(-4px)',
                },
              },
            }}
            onClick={() => document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' })}
          >
            <KeyboardArrowDown sx={{ fontSize: '3rem' }} />
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Hero;