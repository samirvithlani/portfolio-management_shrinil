import React, { useState } from 'react';
import { Grid, Card, CardContent, Typography, Button, Chip, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { styled } from '@mui/material/styles';
import axios from 'axios'; // For making API calls

const FlipCard = styled(Card)(({ theme, flipped }) => ({
  position: 'relative',
  width: '100%',
  height: '300px', // Set a height for demonstration
  transformStyle: 'preserve-3d',
  transition: 'transform 0.6s',
  transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
  perspective: '1000px',
  backgroundColor: '#496AB4',
  color: '#fff',
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
  color: '#fff',
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
  color: '#fff',
}));

const CreatorEducation = ({ education, profileId, setEducation }) => {
  const [flippedIndex, setFlippedIndex] = useState(null);
  const [loading, setLoading] = useState(false); // To show loading status during deletion
  const [open, setOpen] = useState(false); // To control the dialog
  const [newEducation, setNewEducation] = useState({
    degree: '',
    major: '',
    school: '',
    location: '',
    startDate: '',
    endDate: '',
    details: [],
    courses: [],
  });

  const handleFlip = (index) => {
    setFlippedIndex(flippedIndex === index ? null : index);
  };

  const handleRemoveEducation = async (educationId) => {
    try {
      setLoading(true);
      await axios.delete(`/creator-profile/profile/${profileId}/education`, {
        data: { educationId }, // Sending educationId in the body
      });

      //setEducation((prevEducation) => prevEducation.filter((edu) => edu._id !== educationId));
    } catch (error) {
      console.error('Error removing education:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddEducation = async () => {
    try {
      setLoading(true);
      const response = await axios.post(`/creator-profile/profile/${profileId}/education`, newEducation);
      //setEducation((prevEducation) => [...prevEducation, response.data.profile.education.pop()]);
      setOpen(false);
    } catch (error) {
      console.error('Error adding education:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Grid container spacing={3} p={3}>
      {education?.length > 0 ? (
        education.map((edu, index) => (
          <Grid item xs={12} md={6} key={edu?._id}>
            <FlipCard flipped={flippedIndex === index}>
              <FlipCardInner>
                <FlipCardFront>
                  <Typography variant="h5" component="div" gutterBottom>
                    {edu?.degree} in {edu?.major}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {edu?.school}, {edu?.location}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {new Date(edu?.startDate)?.toLocaleDateString()} -{' '}
                    {new Date(edu?.endDate)?.toLocaleDateString()}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" mt={2}>
                    {edu?.details?.join(' ')}
                  </Typography>
                  <Button size="small" color="primary" onClick={() => handleFlip(index)}>
                    See Courses
                  </Button>
                  <Button
                    size="small"
                    color="error"
                    onClick={() => handleRemoveEducation(edu._id)}
                    disabled={loading}
                    sx={{ mt: 1 }}
                  >
                    {loading ? 'Removing...' : 'Remove'}
                  </Button>
                </FlipCardFront>
                <FlipCardBack>
                  <Typography variant="h6" component="div" gutterBottom>
                    Courses
                  </Typography>
                  {edu?.courses?.map((course, idx) => (
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

      {/* Add New Education Button */}
      <Grid item xs={12} display="flex" justifyContent="center">
        <Button variant="contained" color="primary" onClick={() => setOpen(true)}>
          Add Education
        </Button>
      </Grid>

      {/* Dialog for Adding Education */}
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Add New Education</DialogTitle>
        <DialogContent>
          <TextField
            label="Degree"
            fullWidth
            margin="dense"
            value={newEducation.degree}
            onChange={(e) => setNewEducation({ ...newEducation, degree: e.target.value })}
          />
          <TextField
            label="Major"
            fullWidth
            margin="dense"
            value={newEducation.major}
            onChange={(e) => setNewEducation({ ...newEducation, major: e.target.value })}
          />
          <TextField
            label="School"
            fullWidth
            margin="dense"
            value={newEducation.school}
            onChange={(e) => setNewEducation({ ...newEducation, school: e.target.value })}
          />
          <TextField
            label="Location"
            fullWidth
            margin="dense"
            value={newEducation.location}
            onChange={(e) => setNewEducation({ ...newEducation, location: e.target.value })}
          />
          <TextField
            label="Start Date"
            type="date"
            fullWidth
            margin="dense"
            value={newEducation.startDate}
            onChange={(e) => setNewEducation({ ...newEducation, startDate: e.target.value })}
          />
          <TextField
            label="End Date"
            type="date"
            fullWidth
            margin="dense"
            value={newEducation.endDate}
            onChange={(e) => setNewEducation({ ...newEducation, endDate: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleAddEducation} color="primary" disabled={loading}>
            {loading ? 'Adding...' : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
};

export default CreatorEducation;
