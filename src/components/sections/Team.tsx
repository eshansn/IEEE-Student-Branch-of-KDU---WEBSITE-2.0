import React from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Chip,
  Paper,
  alpha,
  Fade,
  Slide,
} from '@mui/material';
import {
  Person,
  Star,
  Group,
} from '@mui/icons-material';
import type { TeamMember as TeamMemberType } from '../../types/team';

const Team: React.FC = () => {
  const spaceGrotesk = '"Space Grotesk", sans-serif';

  const executiveCommittee: TeamMemberType[] = [
    {
      name: 'Atheesha Shanthakumar',
      position: 'Chairperson',
      image: '/images/Exco/2026/chair.png',
      color: '#FF6B35',
      email: 'atheesha.shanthakumar@ieee.org'
    },
    {
      name: 'Amesh Abeykoon',
      position: 'Vice Chairperson',
      image: '/images/Exco/2026/vicechair.png',
      color: '#4ECDC4',
      email: 'ameshisu@ieee.org'
    },
    {
      name: 'Kavindya Rajapaksha',
      position: 'Secretary',
      image: '/images/Exco/2026/secratary.png',
      color: '#45B7D1',
      email: 'kavindyarajapaksha2003@gmail.com'
    },
    {
      name: 'Omesha Nethmini',
      position: 'Assistant Secretary',
      image: '/images/Exco/2026/asstsecratary.png',
      color: '#96CEB4',
      email: 'omeshanethmini@ieee.org'
    },
    {
      name: 'Malki Dilshani',
      position: 'Treasurer',
      image: '/images/Exco/2026/treasurer.png',
      color: '#FFEAA7',
      email: 'phgmdilshani@outlook.com'
    },
    {
      name: 'Bimuthu Edirisinghe',
      position: 'Chapter Coordinator',
      image: '/images/Exco/2026/chaptercoordinator.png',
      color: '#DDA0DD',
      email: 'bimuthudazz@gmail.com'
    },
    {
      name: 'Eshan Nethmina',
      position: 'Webmaster',
      image: '/images/Exco/2026/webmaster.png',
      color: '#98D8C8',
      email: 'eshannethmina@ieee.org'
    }
  ];

  const standingCommitteeHeads: TeamMemberType[] = [
    {
      name: 'Janeesha Charuni',
      position: 'Public Visibility',
      image: '/images/Exco/2026/headofpv.png',
      color: '#FF7675',
      email: 'janeesha2003@gmail.com'
    },
    {
      name: 'Thuhina Nimnadira',
      position: 'Editorial',
      image: '/images/Exco/2026/headofeditorial.png',
      color: '#74B9FF',
      email: 'nimnadirathuhina@gmail.com'
    },
    {
      name: 'Thenuri Thesara',
      position: 'Industry Engagement',
      image: '/images/Exco/2026/headofindustry.png',
      color: '#00B894',
      email: 'thenurithesara@gmail.com'
    },
    {
      name: 'Tharindu Hapuarachchi',
      position: 'Membership Development',
      image: '/images/Exco/2026/headofmember.png',
      color: '#FDCB6E',
      email: 'tharindunipunha@gmail.com'
    },
    {
      name: 'Dahamya Ranasinghe',
      position: 'Volunteer Management',
      image: '/images/Exco/2026/headofvolunteermanagement.png',
      color: '#E17055',
      email: 'dahamyaranasinghe@ieee.org'
    },
    {
      name: 'Nishadha Jayasooriya',
      position: 'Logistics',
      image: '/images/Exco/2026/headoflogistics.png',
      color: '#A29BFE',
      email: 'nishadhashanith@gmail.com'
    }
  ];

  const TeamMember: React.FC<{ member: TeamMemberType; index: number }> = ({ member, index }) => {
    const nameParts = member.name.split(' ');
    const firstName = nameParts[0];
    const lastName = nameParts.length > 1 ? nameParts.slice(1).join(' ') : '';

    return (
      <Fade in={true} timeout={800 + index * 100}>
        <Paper
          elevation={0}
          sx={{
            backgroundColor: '#0d0f12', 
            borderRadius: '32px',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            boxShadow: 'inset 0px -6px 20px -8px rgba(0, 102, 204, 0.5)',
            overflow: 'hidden',
            position: 'relative',
            transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
            cursor: 'pointer',
            height: 440, 
            width: '100%',
            maxWidth: 280, 
            mx: 'auto',
            display: 'flex',
            flexDirection: 'column',
            '&:hover': {
              transform: 'scale(1.04)',
              boxShadow: `0 20px 40px ${alpha('#0066CC', 0.2)}, inset 0px -6px 20px -8px rgba(0, 102, 204, 0.8)`,
              border: '1px solid rgba(255, 255, 255, 0.15)',
              '&::after': {
                animation: 'glass-reflect 1.2s ease-in-out',
              }
            },
            '&::after': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: '-150%',
              width: '50%',
              height: '100%',
              background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.15), transparent)',
              transform: 'skewX(-25deg)',
              transition: 'none',
              zIndex: 10,
              pointerEvents: 'none',
            }
          }}
        >
        
          <Box 
            sx={{ 
              width: '100%',
              height: 240,
              minHeight: 240,
              p: 1.5, 
              borderBottomLeftRadius: '48px',
              borderBottomRightRadius: '48px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {member.image ? (
              <Box
                component="img"
                src={member.image}
                alt={member.name}
                sx={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'center',
                  borderRadius: '24px', 
                }}
              />
            ) : (
              <Typography sx={{ color: 'white', fontFamily: spaceGrotesk, fontSize: '2.5rem', fontWeight: 700 }}>
                {firstName[0]}{lastName ? lastName[0] : ''}
              </Typography>
            )}
          </Box>

          <Box 
            sx={{ 
              p: 2.5, 
              pb: 3,
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              flexGrow: 1,
              justifyContent: 'center',
              overflow: 'hidden', 
            }}
          >
            <Typography
              sx={{
                fontWeight: 500,
                color: '#a0a0a0',
                fontFamily: spaceGrotesk,
                fontSize: '1.6rem',
                lineHeight: 1.1,
                letterSpacing: '-0.02em',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {firstName}
            </Typography>
            <Typography
              sx={{
                fontWeight: 600,
                color: '#ffffff',
                fontFamily: spaceGrotesk,
                fontSize: '1.6rem', 
                lineHeight: 1.1,
                letterSpacing: '-0.02em',
                mb: 2,
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {lastName}
            </Typography>
            
            <Typography
              variant="body2"
              sx={{
                color: '#b0b0b0',
                fontFamily: spaceGrotesk,
                fontWeight: 500,
                fontSize: '0.7rem',
                textTransform: 'uppercase',
                letterSpacing: '0.15em',
                mb: 2,
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {member.position}
            </Typography>

            <Typography
              component="a"
              href={`mailto:${member.email}`}
              sx={{
                color: '#ffffff',
                fontFamily: spaceGrotesk,
                fontWeight: 400,
                fontSize: '0.8rem',
                textDecoration: 'none',
                mt: 'auto', 
                display: 'block',
                width: '100%',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                transition: 'color 0.2s ease',
                '&:hover': {
                  color: '#4ECDC4',
                }
              }}
            >
              {member.email}
            </Typography>
          </Box>
        </Paper>
      </Fade>
    );
  };

  return (
    <>
      <style>
        {`
          @keyframes glass-reflect {
            0% { left: -150%; }
            100% { left: 150%; }
          }
        `}
      </style>

      <Box
        id="team"
        sx={{
          py: 12,
          background: 'linear-gradient(135deg, #0a0a0a 0%, #111111 100%)',
          position: 'relative',
          overflow: 'hidden',
          color: 'white',
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: 150,
            right: -100,
            width: 350,
            height: 350,
            borderRadius: '50%',
            background: 'linear-gradient(135deg, rgba(0, 102, 204, 0.08), rgba(51, 153, 255, 0.12))',
            filter: 'blur(80px)',
            animation: 'float 15s ease-in-out infinite',
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            bottom: 100,
            left: -80,
            width: 280,
            height: 280,
            borderRadius: '50%',
            background: 'linear-gradient(135deg, rgba(255, 215, 0, 0.05), rgba(255, 165, 0, 0.08))',
            filter: 'blur(60px)',
            animation: 'float 12s ease-in-out infinite reverse',
          }}
        />

        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <Box textAlign="center" sx={{ mb: 10 }}>
            <Slide direction="down" in={true} timeout={600}>
              <Box sx={{ mb: 3 }}>
                <Chip
                  label="Our Team"
                  sx={{
                    background: 'linear-gradient(135deg, #0066CC 0%, #3399FF 100%)',
                    color: 'white',
                    fontWeight: 600,
                    fontFamily: spaceGrotesk,
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
                  color: 'white',
                  fontFamily: spaceGrotesk,
                }}
              >
                OUR TEAM
              </Typography>
            </Fade>

            <Fade in={true} timeout={1000}>
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 600,
                  color: '#3399FF',
                  fontFamily: spaceGrotesk,
                  mb: 3,
                }}
              >
                COMMITTEE 2025/26
              </Typography>
            </Fade>

            <Fade in={true} timeout={1200}>
              <Typography
                variant="h6"
                sx={{
                  color: alpha('#ffffff', 0.7),
                  maxWidth: 700,
                  mx: 'auto',
                  lineHeight: 1.6,
                  fontFamily: spaceGrotesk,
                  fontSize: '1.1rem',
                  fontWeight: 400,
                }}
              >
                Meet the dedicated leaders driving innovation and excellence at IEEE KDU
              </Typography>
            </Fade>
          </Box>

          <Box sx={{ mb: 12 }}>
            <Fade in={true} timeout={1400}>
              <Box textAlign="center" sx={{ mb: 6 }}>
                <Typography
                  variant="h3"
                  sx={{
                    fontWeight: 700,
                    mb: 2,
                    color: 'white',
                    fontFamily: spaceGrotesk,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 2,
                  }}
                >
                  <Star sx={{ color: '#FFD700', fontSize: '2rem' }} />
                  Executive Committee
                </Typography>
              </Box>
            </Fade>

            <Box 
              sx={{ 
                display: 'grid',
                gridTemplateColumns: {
                  xs: '1fr',
                  sm: 'repeat(2, 1fr)',
                  md: 'repeat(3, 1fr)',
                  lg: 'repeat(4, 1fr)' 
                },
                gap: 3,
                justifyItems: 'center'
              }}
            >
              {executiveCommittee.map((member, index) => (
                <Box key={index} sx={{ width: '100%' }}>
                  <TeamMember member={member} index={index} />
                </Box>
              ))}
            </Box>
          </Box>

          <Box sx={{ mb: 10 }}>
            <Fade in={true} timeout={1600}>
              <Box textAlign="center" sx={{ mb: 6 }}>
                <Typography
                  variant="h3"
                  sx={{
                    fontWeight: 700,
                    mb: 2,
                    color: 'white',
                    fontFamily: spaceGrotesk,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 2,
                  }}
                >
                  <Group sx={{ color: '#0066CC', fontSize: '2rem' }} />
                  Standing Committee Heads
                </Typography>
              </Box>
            </Fade>

            <Box 
              sx={{ 
                display: 'grid',
                gridTemplateColumns: {
                  xs: '1fr',
                  sm: 'repeat(2, 1fr)',
                  md: 'repeat(3, 1fr)',
                  lg: 'repeat(4, 1fr)'
                },
                gap: 3,
                justifyItems: 'center'
              }}
            >
              {standingCommitteeHeads.map((member, index) => (
                <Box key={index} sx={{ width: '100%' }}>
                  <TeamMember member={member} index={index + executiveCommittee.length} />
                </Box>
              ))}
            </Box>
          </Box>

          <Fade in={true} timeout={2000}>
            <Paper
              elevation={0}
              sx={{
                background: alpha('#ffffff', 0.05),
                backdropFilter: 'blur(20px)',
                borderRadius: 6,
                p: 6,
                textAlign: 'center',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                maxWidth: 600,
                mx: 'auto',
              }}
            >
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 700,
                  mb: 2,
                  color: 'white',
                  fontFamily: spaceGrotesk,
                }}
              >
                Ready to Join Us?
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: alpha('#ffffff', 0.7),
                  mb: 4,
                  fontSize: '1.1rem',
                  lineHeight: 1.6,
                  fontFamily: spaceGrotesk,
                }}
              >
                Become part of our amazing team and contribute to the future of technology at KDU
              </Typography>
              <Button
                variant="contained"
                size="large"
                startIcon={<Person />}
                onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
                sx={{
                  py: 2,
                  px: 4,
                  fontSize: '1.1rem',
                  fontFamily: spaceGrotesk,
                  borderRadius: 4,
                  background: 'linear-gradient(135deg, #0066CC 0%, #3399FF 100%)',
                  boxShadow: '0 8px 25px rgba(0, 102, 204, 0.3)',
                  '&:hover': {
                    background: 'linear-gradient(135deg, #003366 0%, #0066CC 100%)',
                    transform: 'translateY(-3px)',
                    boxShadow: '0 12px 35px rgba(0, 102, 204, 0.4)',
                  },
                }}
              >
                Join Our Team
              </Button>
            </Paper>
          </Fade>

        </Container>
      </Box>
    </>
  );
};

export default Team;
