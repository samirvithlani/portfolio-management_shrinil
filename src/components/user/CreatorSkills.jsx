import React from 'react';
import { Grid, Card, CardContent, Typography, CircularProgress, Box, Chip } from '@mui/material';

const SkillCard = ({ skill }) => {
  return (
    <Card sx={{ maxWidth: 345, p: 2,background: "white",border:"2px",borderRadius:"20px" }}>
      <CardContent>
        {/* Skill Name */}
        <Typography variant="h6" component="div" gutterBottom>
          {skill.name}
        </Typography>

        {/* Circular Progress showing skill rating */}
        <Box display="flex" alignItems="center" justifyContent="center" mb={2} position="relative">
          <CircularProgress
            variant="determinate"
            value={skill.rating * 10}  // Assume rating is out of 10
            size={80}
            thickness={4}
            sx={{ position: 'relative',color:"black" }}
          />
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color:"black"
            }}
          >
            <Typography variant="h6" color="text.primary" component="div">
              {skill.rating}
            </Typography>
          </Box>
        </Box>

        {/* Certification Chip */}
        {skill.certification && (
          <Chip sx={{color:"black",font:"bold"}} label={skill.certification} color="primary" variant="outlined" />
        )}
      </CardContent>
    </Card>
  );
};

export const CreatorSkills = ({ skills }) => {
  return (
    <>
    <Typography variant="h4" gutterBottom sx={{textAlign:"center"}}>
        Skills
      </Typography>
    <Grid container spacing={3} p={3}>
      
      {skills?.map((skill, index) => (
        <Grid item xs={12} sm={6} md={4} key={index}>
          <SkillCard skill={skill} />
        </Grid>
      ))}
    </Grid>
    </>
  );
};

export default CreatorSkills;
