import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Button,
  Chip,
  Paper,
  useTheme,
  alpha,
  Fade,
  Slide,
} from '@mui/material';
import {
  ExpandMore,
  HelpOutline,
  Email,
  QuestionAnswer,
  Support,
} from '@mui/icons-material';

const FAQ: React.FC = () => {
  const theme = useTheme();
  const [expanded, setExpanded] = useState<string | false>(false);

  const handleChange = (panel: string) => (_event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

  const faqData = [
    {
      category: 'General Information',
      icon: <HelpOutline />,
      color: '#4ECDC4',
      questions: [
        {
          id: 'general1',
          question: 'What is the IEEE Student Branch at General Sir John Kotelawala Defence University?',
          answer: 'IEEE Student Branch of General Sir John Kotelawala Defence University is a student organization established in 2016 that provides facilities and opportunities to students in Computer Science, Engineering, Telecommunication, and Robotics fields.'
        },
        {
          id: 'general2',
          question: 'Who can join the IEEE Student Branch?',
          answer: 'Any student of General Sir John Kotelawala Defence University interested in technology, engineering, and professional development can join our IEEE Student Branch.'
        },
        {
          id: 'general3',
          question: 'What are the benefits of joining the IEEE Student Branch?',
          answer: 'Members get access to networking opportunities, professional development programs, project support and funding, technical workshops, industry exposure, and mentorship programs.'
        }
      ]
    },
    {
      category: 'Membership',
      icon: <QuestionAnswer />,
      color: '#FF6B35',
      questions: [
        {
          id: 'membership1',
          question: 'How do I join the IEEE Student Branch?',
          answer: 'You can join by contacting us through our official email ieeesbkdu@kdu.ac.lk or by attending our recruitment events held at the beginning of each academic year.'
        },
        {
          id: 'membership2',
          question: 'Are there any fees associated with joining the IEEE Student Branch?',
          answer: 'Yes, there are minimal membership fees that help cover event costs and administrative expenses. Please contact us for current fee structure.'
        }
      ]
    },
    {
      category: 'Activities and Events',
      icon: <Support />,
      color: '#45B7D1',
      questions: [
        {
          id: 'activities1',
          question: 'What kind of activities and events does the IEEE Student Branch hold?',
          answer: 'We organize technical workshops, industry visits, hackathons, seminars, networking events, competitions, and professional development programs throughout the year.'
        },
        {
          id: 'activities2',
          question: 'How can I stay informed about IEEE Student Branch activities and events?',
          answer: 'Follow our social media pages (Facebook, Instagram, LinkedIn) and join our mailing list to receive updates about upcoming events and activities.'
        }
      ]
    },
    {
      category: 'Additional Information',
      icon: <Email />,
      color: '#96CEB4',
      questions: [
        {
          id: 'additional1',
          question: 'How can I get involved in the IEEE Student Branch?',
          answer: 'You can get involved by joining as a member, volunteering for events, participating in committees, or running for executive positions during elections.'
        },
        {
          id: 'additional2',
          question: 'Who can I contact for more information?',
          answer: 'You can contact us via email at ieeesbkdu@kdu.ac.lk or visit our office at the Kotelawala Defence University campus in Ratmalana, Sri Lanka.'
        }
      ]
    }
  ];

  return (
    <Box
      id="faq"
      sx={{
        py: 12,
        background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background decorations */}
      <Box
        sx={{
          position: 'absolute',
          top: 100,
          left: -100,
          width: 300,
          height: 300,
          borderRadius: '50%',
          background: 'linear-gradient(135deg, rgba(0, 102, 204, 0.08), rgba(51, 153, 255, 0.12))',
          filter: 'blur(80px)',
          animation: 'float 10s ease-in-out infinite',
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          bottom: 150,
          right: -150,
          width: 400,
          height: 400,
          borderRadius: '50%',
          background: 'linear-gradient(135deg, rgba(255, 215, 0, 0.08), rgba(255, 165, 0, 0.12))',
          filter: 'blur(100px)',
          animation: 'float 14s ease-in-out infinite reverse',
        }}
      />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <Box textAlign="center" sx={{ mb: 10 }}>
          <Slide direction="down" in={true} timeout={600}>
            <Box sx={{ mb: 3 }}>
              <Chip
                label="FAQ"
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
              FAQ
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
              FREQUENTLY ASKED QUESTIONS
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
              Find answers to common questions about IEEE KDU and our programs
            </Typography>
          </Fade>
        </Box>

        {/* FAQ Content */}
        <Box sx={{ maxWidth: 1200, mx: 'auto', mb: 8 }}>
          {faqData.map((category, categoryIndex) => (
            <Fade key={categoryIndex} in={true} timeout={1000 + categoryIndex * 200}>
              <Box sx={{ mb: 6 }}>
                {/* Category Header */}
                <Box 
                  sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    mb: 4,
                    pb: 2,
                    borderBottom: `3px solid ${category.color}`,
                  }}
                >
                  <Box
                    sx={{
                      width: 48,
                      height: 48,
                      borderRadius: '50%',
                      backgroundColor: alpha(category.color, 0.1),
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mr: 2,
                      '& .MuiSvgIcon-root': {
                        color: category.color,
                        fontSize: '1.5rem',
                      },
                    }}
                  >
                    {category.icon}
                  </Box>
                  <Typography
                    variant="h5"
                    sx={{
                      fontWeight: 700,
                      color: theme.palette.text.primary,
                      fontFamily: '"Poppins", sans-serif',
                    }}
                  >
                    {category.category}
                  </Typography>
                </Box>

                {/* Questions */}
                <Box sx={{ space: 2 }}>
                  {category.questions.map((faq) => (
                    <Accordion
                      key={faq.id}
                      expanded={expanded === faq.id}
                      onChange={handleChange(faq.id)}
                      sx={{
                        mb: 2,
                        borderRadius: '16px !important',
                        border: '1px solid rgba(0, 0, 0, 0.08)',
                        boxShadow: 'none',
                        '&:before': {
                          display: 'none',
                        },
                        '&.Mui-expanded': {
                          margin: '0 0 16px 0',
                          boxShadow: `0 8px 25px ${alpha(category.color, 0.15)}`,
                        },
                      }}
                    >
                      <AccordionSummary
                        expandIcon={
                          <ExpandMore 
                            sx={{ 
                              color: category.color,
                              fontSize: '1.5rem',
                            }} 
                          />
                        }
                        sx={{
                          borderRadius: '16px',
                          minHeight: 72,
                          px: 3,
                          '&.Mui-expanded': {
                            borderBottomLeftRadius: 0,
                            borderBottomRightRadius: 0,
                          },
                          '& .MuiAccordionSummary-content': {
                            margin: '16px 0',
                          },
                        }}
                      >
                        <Typography
                          variant="h6"
                          sx={{
                            fontWeight: 600,
                            color: theme.palette.text.primary,
                            fontSize: '1.1rem',
                            lineHeight: 1.4,
                            pr: 2,
                          }}
                        >
                          {faq.question}
                        </Typography>
                      </AccordionSummary>
                      <AccordionDetails
                        sx={{
                          px: 3,
                          pb: 3,
                          borderTop: `1px solid ${alpha(category.color, 0.1)}`,
                        }}
                      >
                        <Typography
                          variant="body1"
                          sx={{
                            color: theme.palette.text.secondary,
                            lineHeight: 1.7,
                            fontSize: '1rem',
                          }}
                        >
                          {faq.answer}
                        </Typography>
                      </AccordionDetails>
                    </Accordion>
                  ))}
                </Box>
              </Box>
            </Fade>
          ))}
        </Box>

        {/* CTA Section */}
        <Fade in={true} timeout={1800}>
          <Paper
            elevation={0}
            sx={{
              background: alpha('#ffffff', 0.8),
              backdropFilter: 'blur(20px)',
              borderRadius: 6,
              p: 6,
              textAlign: 'center',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              maxWidth: 600,
              mx: 'auto',
            }}
          >
            <Typography
              variant="h5"
              sx={{
                fontWeight: 700,
                mb: 2,
                color: theme.palette.text.primary,
                fontFamily: '"Poppins", sans-serif',
              }}
            >
              Still have questions?
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: theme.palette.text.secondary,
                mb: 4,
                fontSize: '1.1rem',
                lineHeight: 1.6,
              }}
            >
              We're here to help! Feel free to reach out to us directly.
            </Typography>
            <Button
              variant="contained"
              size="large"
              startIcon={<Email />}
              onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
              sx={{
                py: 2,
                px: 4,
                fontSize: '1.1rem',
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
              Contact Us
            </Button>
          </Paper>
        </Fade>
      </Container>
    </Box>
  );
};

export default FAQ;
