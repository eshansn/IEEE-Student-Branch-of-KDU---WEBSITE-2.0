import React from 'react';
import {
  Box,
  Container,
  Typography,
  IconButton,
  Link,
  Divider,
  alpha,
} from '@mui/material';
import {
  Facebook,
  Instagram,
  LinkedIn,
  Email,
  LocationOn,
} from '@mui/icons-material';
import { useLocation, useNavigate } from 'react-router-dom';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const location = useLocation();
  const navigate = useNavigate();

  const ieeeLinks = [
    { name: 'IEEE', url: 'https://www.ieee.org/' },
    { name: 'IEEE Xplore Digital Library', url: 'https://ieeexplore.ieee.org/Xplore/home.jsp' },
    { name: 'IEEE Standards', url: 'https://standards.ieee.org/' },
    { name: 'IEEE Spectrum', url: 'https://spectrum.ieee.org/' },
    { name: 'More Sites', url: 'https://www.ieee.org/sitemap.html' }
  ];

  const quickLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Team', href: '#team' },
    { name: 'Contact & Support', href: '#contact' },
    { name: 'IEEE Privacy Policy', href: 'https://www.ieee.org/security-privacy.html' }
  ];

  const handleQuickLinkClick = (event: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (!href.startsWith('#')) {
      return;
    }

    event.preventDefault();

    if (location.pathname !== '/') {
      navigate(`/${href}`);
      return;
    }

    navigate({ pathname: '/', hash: href }, { replace: true });
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  const socialMedia = [
    {
      name: 'Facebook',
      icon: <Facebook />,
      url: 'https://www.facebook.com/ieee.kdu/',
      color: '#1877F2',
    },
    {
      name: 'Instagram',
      icon: <Instagram />,
      url: 'https://www.instagram.com/ieee_kdu/',
      color: '#E4405F',
    },
    {
      name: 'LinkedIn',
      icon: <LinkedIn />,
      url: 'https://www.linkedin.com/company/ieee-student-branch-kotelawala-defence-university/',
      color: '#0A66C2',
    },
  ];

  return (
    <Box
      component="footer"
      sx={{
        background: 'linear-gradient(135deg, #1a1a1a 0%, #2d3748 100%)',
        color: 'white',
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
          background: 'radial-gradient(circle at 20% 20%, rgba(0, 102, 204, 0.1) 1px, transparent 1px)',
          backgroundSize: '50px 50px',
          opacity: 0.3,
        }}
      />

      {/* Main Footer Content */}
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <Box sx={{ py: 8 }}>
          <Box 
            sx={{ 
              display: 'grid',
              gridTemplateColumns: {
                xs: '1fr',
                md: '1fr 1fr',
                lg: '5fr 3.5fr 3.5fr'
              },
              gap: 4
            }}
          >
            {/* Logo and Description */}
            <Box>
              <Box sx={{ mb: 4 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                  <Box
                    component="img"
                    src="/images/logo/IEEE KDU New logo - Copy.png"
                    alt="IEEE KDU Logo"
                    sx={{
                      width: 48,
                      height: 48,
                      borderRadius: '50%',
                      mr: 2,
                    //   boxShadow: '0 4px 20px rgba(0, 102, 204, 0.3)',
                    }}
                  />
                  <Box>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 700,
                        fontFamily: '"Poppins", sans-serif',
                      }}
                    >
                      IEEE Student Branch
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: alpha('#ffffff', 0.7),
                        fontSize: '0.85rem',
                      }}
                    >
                      General Sir John Kotelawala Defence University
                    </Typography>
                  </Box>
                </Box>

                <Typography
                  variant="body1"
                  sx={{
                    color: alpha('#ffffff', 0.8),
                    lineHeight: 1.7,
                    mb: 4,
                    fontSize: '0.95rem',
                  }}
                >
                  A not-for-profit organization, IEEE is the world's largest technical
                  professional organization dedicated to advancing technology for the benefit of humanity.
                </Typography>

                {/* Contact Info */}
                <Box sx={{ mb: 4 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <LocationOn sx={{ fontSize: '1rem', mr: 1, color: alpha('#ffffff', 0.7) }} />
                    <Typography variant="body2" sx={{ color: alpha('#ffffff', 0.8) }}>
                      General Sir John Kotelawala Defence University, <br/>Ratmalana, <br/>Sri Lanka.
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Email sx={{ fontSize: '1rem', mr: 1, color: alpha('#ffffff', 0.7) }} />
                    <Link
                      href="mailto:ieeesbkdu@kdu.ac.lk"
                      sx={{
                        color: '#3399FF',
                        textDecoration: 'none',
                        fontSize: '0.9rem',
                        '&:hover': {
                          textDecoration: 'underline',
                        },
                      }}
                    >
                      ieeesbkdu@kdu.ac.lk
                    </Link>
                  </Box>
                </Box>

                {/* Social Media */}
                <Box>
                  <Typography
                    variant="body2"
                    sx={{
                      color: alpha('#ffffff', 0.9),
                      mb: 2,
                      fontWeight: 600,
                    }}
                  >
                    Follow Us
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    {socialMedia.map((social, index) => (
                      <IconButton
                        key={index}
                        component="a"
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        sx={{
                          width: 40,
                          height: 40,
                          backgroundColor: alpha('#ffffff', 0.1),
                          color: alpha('#ffffff', 0.8),
                          transition: 'all 0.3s ease',
                          '&:hover': {
                            backgroundColor: social.color,
                            color: 'white',
                            transform: 'translateY(-2px)',
                          },
                        }}
                      >
                        {social.icon}
                      </IconButton>
                    ))}
                  </Box>
                </Box>
              </Box>
            </Box>

            {/* IEEE Links */}
            <Box>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 700,
                  mb: 3,
                  fontFamily: '"Poppins", sans-serif',
                }}
              >
                IEEE Resources
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                {ieeeLinks.map((link, index) => (
                  <Link
                    key={index}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{
                      color: alpha('#ffffff', 0.7),
                      textDecoration: 'none',
                      fontSize: '0.9rem',
                      transition: 'color 0.3s ease',
                      '&:hover': {
                        color: '#3399FF',
                      },
                    }}
                  >
                    {link.name}
                  </Link>
                ))}
              </Box>
            </Box>

            {/* Quick Links */}
            <Box>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 700,
                  mb: 3,
                  fontFamily: '"Poppins", sans-serif',
                }}
              >
                Quick Links
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                {quickLinks.map((link, index) => (
                  <Link
                    key={index}
                    href={link.href.startsWith('#') ? `/${link.href}` : link.href}
                    onClick={(event) => handleQuickLinkClick(event, link.href)}
                    sx={{
                      color: alpha('#ffffff', 0.7),
                      textDecoration: 'none',
                      fontSize: '0.9rem',
                      transition: 'color 0.3s ease',
                      cursor: 'pointer',
                      '&:hover': {
                        color: '#3399FF',
                      },
                    }}
                  >
                    {link.name}
                  </Link>
                ))}
              </Box>
            </Box>
          </Box>
        </Box>

        {/* Bottom Footer */}
        <Box sx={{ py: 3 }}>
          <Divider sx={{ mb: 3, backgroundColor: alpha('#ffffff', 0.1) }} />
          <Box 
            sx={{ 
              display: 'grid',
              gridTemplateColumns: {
                xs: '1fr',
                md: '2fr 1fr'
              },
              gap: 2,
              alignItems: 'center'
            }}
          >
            <Box>
              <Typography
                variant="body2"
                sx={{
                  color: alpha('#ffffff', 0.6),
                  fontSize: '0.85rem',
                  lineHeight: 1.6,
                  textAlign: { xs: 'center', md: 'left' },
                }}
              >
                Copyright © {currentYear}. IEEE SB KDU. All Rights Reserved.
                <br />
                Use of this website signifies your agreement to the{' '}
                <Link
                  href="https://www.ieee.org/about/help/site-terms-conditions.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    color: '#3399FF',
                    textDecoration: 'none',
                    '&:hover': {
                      textDecoration: 'underline',
                    },
                  }}
                >
                  IEEE Terms and Conditions
                </Link>
                .
              </Typography>
            </Box>
            <Box>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: { xs: 'center', md: 'flex-end' },
                  gap: 0.5,
                }}
              >
                <Typography
                  variant="body2"
                  sx={{
                    color: alpha('#ffffff', 0.6),
                    fontSize: '0.85rem',
                  }}
                >
                  Designed by
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: alpha('#ffffff', 0.6),
                    fontSize: '0.85rem',
                  }}
                >
                  IEEE Student branch of KDU
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
