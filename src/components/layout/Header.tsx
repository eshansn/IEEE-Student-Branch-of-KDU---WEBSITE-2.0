import React, { useState, useEffect } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  useTheme,
  alpha,
  Fade,
  Slide,
} from '@mui/material';
import { keyframes } from '@emotion/react';
import { Menu as MenuIcon, Close as CloseIcon } from '@mui/icons-material';
import { useLocation, useNavigate } from 'react-router-dom';

const activeNavGradient = 'linear-gradient(90deg, #39D5FF 0%, #0066CC 35%, #8B5CFF 70%, #39D5FF 100%)';
const flowGradient = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const theme = useTheme();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (location.pathname !== '/') {
      return undefined;
    }

    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -80% 0px',
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    
    // Observe all sections
    const sections = ['home', 'about', 'projects', 'team', 'faq', 'contact'];
    sections.forEach((sectionId) => {
      const element = document.getElementById(sectionId);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      sections.forEach((sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
          observer.unobserve(element);
        }
      });
    };
  }, [location.pathname]);

  useEffect(() => {
    if (location.pathname !== '/' || !location.hash) {
      return undefined;
    }

    const frame = window.requestAnimationFrame(() => {
      document.querySelector(location.hash)?.scrollIntoView({ behavior: 'smooth' });
    });

    return () => window.cancelAnimationFrame(frame);
  }, [location.hash, location.pathname]);

  const navItems = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Team', href: '#team' },
    { name: 'FAQ', href: '#faq' },
    { name: 'Contact', href: '#contact' },
  ];

  const handleNavClick = (href: string) => {
    setIsMenuOpen(false);

    if (location.pathname !== '/') {
      navigate(`/${href}`);
      return;
    }

    navigate({ pathname: '/', hash: href }, { replace: true });
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <Slide direction="down" in={true} mountOnEnter unmountOnExit>
        <AppBar
          position="fixed"
          elevation={0}
          sx={{
            background: isScrolled
              ? alpha(theme.palette.background.paper, 0.95)
              : 'transparent',
            backdropFilter: isScrolled ? 'blur(20px)' : 'none',
            border: isScrolled ? `1px solid ${alpha(theme.palette.divider, 0.12)}` : '1px solid transparent',
            borderRadius: isScrolled ? { xs: 3, md: 4 } : 0,
            boxShadow: isScrolled ? '0 12px 40px rgba(0, 24, 72, 0.16)' : 'none',
            top: isScrolled ? { xs: 8, md: 12 } : 0,
            left: isScrolled ? { xs: 8, sm: 16, md: 24 } : 0,
            right: isScrolled ? { xs: 8, sm: 16, md: 24 } : 0,
            width: 'auto',
            overflow: 'hidden',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          }}
        >
          <Container maxWidth="xl">
            <Toolbar sx={{ minHeight: { xs: 70, md: 80 }, px: 0 }}>
              {/* Logo Section */}
              <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
                <Box sx={{ position: 'relative', mr: 2 }}>
                  <Box
                    component="img"
                    src="/images/logo/IEEE KDU New logo2.png"
                    alt="IEEE KDU Logo"
                    sx={{
                      height: 60,
                      width: 'auto',
                      maxWidth: 300,
                      objectFit: 'contain',
                    //   boxShadow: '0 4px 20px rgba(0, 102, 204, 0.3)',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: 'scale(1.05)',
                        // boxShadow: '0 6px 25px rgba(0, 102, 204, 0.4)',
                      },
                    }}
                  />
                </Box>
              </Box>

              {/* Desktop Navigation */}
              <Box sx={{ display: { xs: 'none', lg: 'flex' }, alignItems: 'center', gap: 1 }}>
                {navItems.map((item) => {
                  const isActive = activeSection === item.href.substring(1); // Remove # from href
                  return (
                    <Button
                      key={item.name}
                      onClick={() => handleNavClick(item.href)}
                      disableRipple
                      sx={{
                        color: isScrolled ? theme.palette.text.primary : 'white',
                        fontWeight: isActive ? 700 : 600,
                        px: 2,
                        py: 1,
                        position: 'relative',
                        backgroundColor: 'transparent',
                        '&::after': {
                          content: '""',
                          position: 'absolute',
                          bottom: 0,
                          left: '50%',
                          width: isActive ? '80%' : 0,
                          height: 2,
                          borderRadius: 999,
                          background: activeNavGradient,
                          backgroundSize: '200% 200%',
                          animation: isActive ? `${flowGradient} 3s ease-in-out infinite` : 'none',
                          transition: 'all 0.3s ease',
                          transform: 'translateX(-50%)',
                        },
                        '&:hover::after': {
                          width: '80%',
                        },
                        '&:hover': {
                          backgroundColor: 'transparent',
                          color: theme.palette.primary.main,
                        },
                        '&:focus-visible': {
                          outline: `2px solid ${alpha(theme.palette.primary.main, 0.65)}`,
                          outlineOffset: 3,
                        },
                      }}
                    >
                      <Box
                        component="span"
                        sx={isActive ? {
                          background: activeNavGradient,
                          backgroundSize: '200% 200%',
                          backgroundClip: 'text',
                          WebkitBackgroundClip: 'text',
                          color: 'transparent',
                          WebkitTextFillColor: 'transparent',
                          animation: `${flowGradient} 3s ease-in-out infinite`,
                        } : undefined}
                      >
                        {item.name}
                      </Box>
                    </Button>
                  );
                })}
              </Box>

              {/* Mobile Menu Button */}
              <IconButton
                sx={{
                  display: { lg: 'none' },
                  ml: 'auto',
                  background: 'linear-gradient(135deg, #0066CC 0%, #3399FF 100%)',
                  color: 'white',
                  '&:hover': {
                    background: 'linear-gradient(135deg, #003366 0%, #0066CC 100%)',
                    transform: 'scale(1.1)',
                  },
                }}
                onClick={() => setIsMenuOpen(true)}
                aria-label="Open navigation menu"
              >
                <MenuIcon />
              </IconButton>
            </Toolbar>
          </Container>
        </AppBar>
      </Slide>

      {/* Full-screen mobile navigation */}
      <Drawer
        anchor="right"
        open={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        transitionDuration={{ enter: 420, exit: 300 }}
        PaperProps={{
          sx: {
            width: '100vw',
            maxWidth: 'none',
            height: '100dvh',
            borderRadius: '0 !important',
            overflowX: 'hidden',
            overflowY: 'auto',
            background: [
              'radial-gradient(circle at 88% 12%, rgba(51, 153, 255, 0.28), transparent 28%)',
              'radial-gradient(circle at 5% 92%, rgba(139, 92, 255, 0.16), transparent 30%)',
              'linear-gradient(145deg, #040b16 0%, #061b35 52%, #003366 100%)',
            ].join(', '),
            color: 'white',
            '&::before': {
              content: '""',
              position: 'absolute',
              inset: 0,
              pointerEvents: 'none',
              opacity: 0.18,
              backgroundImage: [
                'linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px)',
                'linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)',
              ].join(', '),
              backgroundSize: '72px 72px',
              maskImage: 'linear-gradient(to bottom, black, transparent 72%)',
            },
          },
        }}
      >
        <Box
          sx={{
            position: 'relative',
            zIndex: 1,
            minHeight: '100dvh',
            width: '100%',
            maxWidth: 1440,
            mx: 'auto',
            px: { xs: 2.5, sm: 5, md: 8 },
            pt: 'max(20px, env(safe-area-inset-top))',
            pb: 'max(22px, env(safe-area-inset-bottom))',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Box
              component="img"
              src="/images/logo/IEEE KDU New logo2.png"
              alt="IEEE KDU Logo"
              sx={{ height: { xs: 48, sm: 58 }, width: 'auto', maxWidth: '70vw', objectFit: 'contain' }}
            />
            <IconButton
              onClick={() => setIsMenuOpen(false)}
              aria-label="Close navigation menu"
              sx={{
                width: { xs: 48, sm: 54 },
                height: { xs: 48, sm: 54 },
                ml: 2,
                flexShrink: 0,
                color: 'white',
                border: `1px solid ${alpha('#ffffff', 0.24)}`,
                backgroundColor: alpha('#ffffff', 0.08),
                backdropFilter: 'blur(12px)',
                transition: 'all 0.25s ease',
                '&:hover': {
                  backgroundColor: alpha('#3399FF', 0.22),
                  borderColor: alpha('#ffffff', 0.55),
                  transform: 'rotate(90deg)',
                },
                '&:focus-visible': {
                  outline: `2px solid ${alpha('#ffffff', 0.8)}`,
                  outlineOffset: 3,
                },
              }}
            >
              <CloseIcon />
            </IconButton>
          </Box>

          <Box
            sx={{
              flex: 1,
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', md: 'minmax(260px, 0.72fr) minmax(420px, 1fr)' },
              alignItems: 'center',
              gap: { xs: 3, md: 10 },
              py: { xs: 3, sm: 5, md: 6 },
            }}
          >
            <Box sx={{ display: { xs: 'none', md: 'block' }, maxWidth: 380 }}>
              <Typography
                sx={{
                  mb: 2,
                  color: '#39D5FF',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                }}
              >
                Explore IEEE KDU
              </Typography>
              <Typography
                variant="h2"
                sx={{
                  mb: 2.5,
                  color: 'white',
                  fontSize: { md: '2.55rem', lg: '3.25rem' },
                  lineHeight: 1.08,
                }}
              >
                Empowering innovation since 2016.
              </Typography>
              <Typography sx={{ color: alpha('#ffffff', 0.62), lineHeight: 1.8, maxWidth: 340 }}>
                IEEE Student Branch of General Sir John Kotelawala Defence University.
              </Typography>
            </Box>

            <List component="nav" aria-label="Main navigation" sx={{ width: '100%', p: 0, maxWidth: 720, ml: { md: 'auto' } }}>
              {navItems.map((item, index) => {
                const isActive = activeSection === item.href.substring(1);
                return (
                  <Fade in={isMenuOpen} timeout={280 + index * 90} key={item.name}>
                    <ListItem disablePadding sx={{ borderBottom: `1px solid ${alpha('#ffffff', 0.14)}` }}>
                      <ListItemButton
                        onClick={() => handleNavClick(item.href)}
                        disableRipple
                        aria-current={isActive ? 'page' : undefined}
                        sx={{
                          minHeight: { xs: 58, sm: 68, md: 76 },
                          px: { xs: 0.5, sm: 1 },
                          py: 1,
                          position: 'relative',
                          gap: { xs: 2, sm: 3 },
                          backgroundColor: 'transparent',
                          '&::before': {
                            content: '""',
                            position: 'absolute',
                            left: 0,
                            top: '50%',
                            width: isActive ? 4 : 0,
                            height: '44%',
                            borderRadius: 999,
                            background: activeNavGradient,
                            backgroundSize: '200% 200%',
                            animation: isActive ? `${flowGradient} 3s ease-in-out infinite` : 'none',
                            transform: 'translateY(-50%)',
                            transition: 'width 0.25s ease',
                          },
                          '&:hover': {
                            backgroundColor: alpha('#ffffff', 0.06),
                            pl: { xs: 1.5, sm: 2 },
                          },
                          '&:focus-visible': {
                            outline: `2px solid ${alpha('#39D5FF', 0.9)}`,
                            outlineOffset: -2,
                          },
                          transition: 'all 0.25s ease',
                        }}
                      >
                        <Typography
                          aria-hidden="true"
                          sx={{
                            width: 28,
                            flexShrink: 0,
                            color: isActive ? '#39D5FF' : alpha('#ffffff', 0.42),
                            fontSize: { xs: '0.68rem', sm: '0.74rem' },
                            fontWeight: 700,
                            letterSpacing: '0.12em',
                          }}
                        >
                          {String(index + 1).padStart(2, '0')}
                        </Typography>
                        <ListItemText
                          primary={item.name}
                          primaryTypographyProps={{
                            fontFamily: '"Space Grotesk", "Inter", sans-serif',
                            fontWeight: isActive ? 700 : 600,
                            fontSize: 'clamp(1.65rem, 5vw, 3.15rem)',
                            lineHeight: 1,
                            letterSpacing: '-0.03em',
                            color: isActive ? '#F8FCFF' : 'white',
                          }}
                        />
                        <Box
                          aria-hidden="true"
                          sx={{
                            width: isActive ? 9 : 6,
                            height: isActive ? 9 : 6,
                            flexShrink: 0,
                            borderRadius: '50%',
                            backgroundColor: isActive ? '#39D5FF' : alpha('#ffffff', 0.3),
                            boxShadow: isActive ? '0 0 18px rgba(57, 213, 255, 0.85)' : 'none',
                            transition: 'all 0.25s ease',
                          }}
                        />
                      </ListItemButton>
                    </ListItem>
                  </Fade>
                );
              })}
            </List>
          </Box>

          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: 2,
              pt: 2,
              borderTop: `1px solid ${alpha('#ffffff', 0.12)}`,
            }}
          >
            <Typography sx={{ color: alpha('#ffffff', 0.48), fontSize: { xs: '0.68rem', sm: '0.78rem' }, letterSpacing: '0.08em' }}>
              IEEE STUDENT BRANCH • KDU
            </Typography>
            <Box sx={{ width: { xs: 42, sm: 72 }, height: 2, flexShrink: 0, background: activeNavGradient, backgroundSize: '200% 200%', animation: `${flowGradient} 3s ease-in-out infinite` }} />
          </Box>
        </Box>
      </Drawer>
    </>
  );
};

export default Header;
