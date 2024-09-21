import React, { useState } from 'react';
import { Grid, Card, CardContent, Typography, Button, Chip } from '@mui/material';
import { styled } from '@mui/material/styles';

const FlipCard = styled(Card)(({ theme, flipped }) => ({
  position: 'relative',
  width: '100%',
  height: '300px', // Set a height for demonstration
  transformStyle: 'preserve-3d',
  transition: 'transform 0.6s',
  transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
  perspective: '1000px',
  backgroundColor: "#496AB4",
  color: "#fff"
}));

const FlipCardInner = styled('div')(({ theme }) => ({
  position: 'relative',
  width: '100%',
  height: '100%',
  transformStyle: 'preserve-3d',
}));

const FlipCardFront = styled(CardContent)(({ theme }) => ({
  position: 'absolute',
  width: '100%',
  height: '100%',
  backfaceVisibility: 'hidden',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  padding: theme.spacing(2),
  color: "#fff"
}));

const FlipCardBack = styled(CardContent)(({ theme }) => ({
  position: 'absolute',
  width: '100%',
  height: '100%',
  backfaceVisibility: 'hidden',
  transform: 'rotateY(180deg)',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  padding: theme.spacing(2),
  color: "#fff"
}));

const exampleData = [
  {
    degree: 'Master of Science, Software Engineering',
    institution: 'San Jose State University',
    dateRange: 'Aug 2019 - May 2021',
    location: 'San Jose, CA',
    description: 'Graduate Research Assistant in the domain of Machine Learning and Web Scrapping. Developed extensive projects including a GrubHub clone (solo project), a Twitter clone, a testing service platform, a sharing-pooling service to name a few.',
    courses: [
      'Enterprise Software Platforms',
      'Enterprise Distributed Systems',
      'Cloud Technologies',
      'Software Systems Engineering',
      'Software Security Technologies',
      'Large Scale Analytics (Recommendation Systems)',
      'Enterprise Application Development'
    ]
  },
  {
    degree: 'Bachelor of Technology, Information and Communication Technology',
    institution: 'Dhirubhai Ambani Institute of Information and Communication Technology',
    dateRange: 'Aug 2014 - May 2018',
    location: 'Gandhinagar, India',
    description: 'Undergrad Researcher at the Cyber Security Research Group at DA-IICT. Core-member of the Microsoft Students\' Technical Club, DA-IICT chapter and member of the Student Body Government (2015-16). Final Year Project: Designed three approaches for avoiding cloud data duplication and tackling ownership issues. Received 10/10 grade.',
    courses: [
      'Cryptography',
      'GPU',
      'Security Protocols',
      'Graph Theory',
      'Software Engineering',
      'Software Project Management',
      'Database Management Systems',
      'Operating Systems',
      'Computer Networks',
      'Neural Networks',
      'Theory of Computation',
      'Logic for Computer Science'
    ]
  }
];

const CreatorEducation = () => {
  const [flippedIndex, setFlippedIndex] = useState(null);

  const handleFlip = (index) => {
    setFlippedIndex(flippedIndex === index ? null : index);
  };

  return (
    <Grid container spacing={3} p={3}>
      {exampleData.length > 0 ? (
        exampleData.map((edu, index) => (
          <Grid item xs={12} md={6} key={index}>
            <FlipCard flipped={flippedIndex === index}>
              <FlipCardInner>
                <FlipCardFront>
                  <Typography variant="h5" component="div" gutterBottom>
                    {edu.degree}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {edu.institution}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {edu.dateRange}, {edu.location}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" mt={2}>
                    {edu.description}
                  </Typography>
                  <Button size="small" color="primary" onClick={() => handleFlip(index)}>
                    See Courses
                  </Button>
                </FlipCardFront>
                <FlipCardBack>
                  <Typography variant="h6" component="div" gutterBottom>
                    Courses
                  </Typography>
                  {edu.courses.map((course, idx) => (
                    <Chip key={idx} label={course} sx={{ m: 0.5 }} />
                  ))}
                  <Button size="small" color="primary" onClick={() => handleFlip(index)}>
                    Back
                  </Button>
                </FlipCardBack>
              </FlipCardInner>
            </FlipCard>
          </Grid>
        ))
      ) : (
        <Grid item xs={12}>
          <Typography variant="h6" component="div" align="center">
            No data available
          </Typography>
        </Grid>
      )}
    </Grid>
  );
};

export default CreatorEducation;
