import React, { useState } from 'react';
import { Grid, Card, CardContent, Typography, CircularProgress, Box, Chip, Button, TextField } from '@mui/material';
import axios from 'axios'; // For making API calls

const SkillCard = ({ skill, onRemove }) => {
  return (
    <Card sx={{ maxWidth: 345, p: 2, background: "white", border: "2px", borderRadius: "20px" }}>
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
            sx={{ position: 'relative', color: "black" }}
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
              color: "black"
            }}
          >
            <Typography variant="h6" color="text.primary" component="div">
              {skill.rating}
            </Typography>
          </Box>
        </Box>

        {/* Certification Chip */}
        {skill.certification && (
          <Chip sx={{ color: "black", fontWeight: "bold" }} label={skill.certification} color="primary" variant="outlined" />
        )}

        {/* Remove Skill Button */}
        <Button size="small" color="error" onClick={() => onRemove(skill._id)}>
          Remove
        </Button>
      </CardContent>
    </Card>
  );
};

export const CreatorSkills = ({ skills, profileId, fetchData }) => {
  const [newSkill, setNewSkill] = useState('');
  const [newRating, setNewRating] = useState(0); // For rating
  const [loading, setLoading] = useState(false);

  const handleAddSkill = async () => {
    try {
      setLoading(true);
      const response = await axios.post(`/creator-profile/profile/${profileId}/skills`, {
        name: newSkill,
        rating: newRating,
      });
      //setSkills(response.data.profile.skills); // Update skills in parent component
      fetchData(); // Fetch updated data
      setNewSkill(''); // Clear input
      setNewRating(0); // Reset rating
    } catch (error) {
      console.error('Error adding skill:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveSkill = async (skillId) => {
    try {
      setLoading(true);
      await axios.delete(`/creator-profile/profile/${profileId}/skills`, { data: { skillId } });
      //setSkills((prevSkills) => prevSkills.filter(skill => skill._id !== skillId)); // Update local state
      fetchData(); // Fetch updated data
    } catch (error) {
      console.error('Error removing skill:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Typography variant="h4" gutterBottom sx={{ textAlign: "center" }}>
        Skills
      </Typography>

      {/* Add Skill Form */}
      <Box display="flex" justifyContent="center" mb={3}>
        <TextField
          variant="outlined"
          label="New Skill"
          value={newSkill}
          onChange={(e) => setNewSkill(e.target.value)}
          sx={{ mr: 2 }}
        />
        <TextField
          variant="outlined"
          label="Rating (0-10)"
          type="number"
          value={newRating}
          onChange={(e) => setNewRating(e.target.value)}
          sx={{ mr: 2 }}
          inputProps={{ min: 0, max: 10 }}
        />
        <Button variant="contained" color="primary" onClick={handleAddSkill} disabled={loading}>
          {loading ? 'Adding...' : 'Add Skill'}
        </Button>
      </Box>

      <Grid container spacing={3} p={3}>
        {skills?.map((skill) => (
          <Grid item xs={12} sm={6} md={4} key={skill._id}>
            <SkillCard skill={skill} onRemove={handleRemoveSkill} />
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default CreatorSkills;
