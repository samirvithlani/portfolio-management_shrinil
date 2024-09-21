import React, { useState } from 'react';
import { Box, Typography, Button, Modal, TextField, IconButton } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { Timeline, TimelineItem, TimelineSeparator, TimelineConnector, TimelineContent, TimelineDot } from '@mui/lab';
import WorkIcon from '@mui/icons-material/Work';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';

export const CreatorExperiance = ({ experiance, id,fetchData }) => {
  const [open, setOpen] = useState(false);
  const [selectedExperience, setSelectedExperience] = useState(null);

  const { handleSubmit, control, reset } = useForm();

  const handleOpen = (experience = null) => {
    setSelectedExperience(experience);
    if (experience) {
      reset(experience);
    } else {
      reset({ role: '', company: '', duration: '', workDetails: '' });
    }
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const onSubmit = async (data) => {
    try {
      if (selectedExperience?._id) {
        // Update experience
        await axios.put(`/creator-profile/updateexperience/${id}`, {
          ...data,
          experienceId: selectedExperience._id,
        });
        fetchData();
      } else {
        // Add new experience
        await axios.put(`/creator-profile/updateexperience/${id}`, data);
        fetchData();
      }

      // Fetch updated profile after submitting
      //fetchUpdatedProfile();
      handleClose();
    } catch (error) {
      console.error('Error updating experience:', error);
    }
  };

  const handleRemove = async (experienceId) => {
    try {
      await axios.put(`/creator-profile/removeexperience/${id}`, { experienceId });
      fetchData();
      
      //fetchUpdatedProfile(); // Optionally refetch the profile after removal
    } catch (error) {
      console.error('Error removing experience:', error);
    }
  };

  return (
    <Box
      sx={{
        backgroundColor: '#496AB4',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        maxWidth: '1200px',
        margin: '0 auto',
        textAlign: 'center',
      }}
    >
      <Typography variant="h5" sx={{ fontWeight: 'bold', marginBottom: '16px' }}>
        Experience
      </Typography>

      <Timeline position="alternate">
        {experiance?.map((experience, index) => (
          <TimelineItem key={experience._id || index}>
            <TimelineSeparator>
              <TimelineDot>
                <WorkIcon />
              </TimelineDot>
              {index < experiance.length - 1 && <TimelineConnector />}
            </TimelineSeparator>
            <TimelineContent>
              <Box sx={{ textAlign: 'left', position: 'relative' }}>
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                  {experience.role}
                </Typography>
                <Typography variant="subtitle1" color="text.secondary">
                  {experience.company} - {experience.duration}
                </Typography>
                <Typography variant="body2" sx={{ marginTop: '8px' }}>
                  {experience.workDetails.join(', ')}
                </Typography>
                <Box sx={{ position: 'relative', top: 0, right: 0}}>
                  <IconButton onClick={() => handleOpen(experience)} sx={{color:"black"}}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleRemove(experience._id)} color="error">
                    <DeleteIcon />
                  </IconButton>
                </Box>
              </Box>
            </TimelineContent>
          </TimelineItem>
        ))}
      </Timeline>

      <Button variant="contained" color="primary" onClick={() => handleOpen()}>
        Add Experience
      </Button>

      {/* Modal for updating/adding experience */}
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            backgroundColor: 'white',
            padding: 4,
            borderRadius: '8px',
            boxShadow: 24,
          }}
        >
          <Typography variant="h6" mb={2}>
            {selectedExperience ? 'Update Experience' : 'Add Experience'}
          </Typography>

          <form onSubmit={handleSubmit(onSubmit)}>
            <Controller
              name="role"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField {...field} label="Role" fullWidth sx={{ mb: 2 }} />
              )}
            />
            <Controller
              name="company"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField {...field} label="Company" fullWidth sx={{ mb: 2 }} />
              )}
            />
            <Controller
              name="duration"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField {...field} label="Duration" fullWidth sx={{ mb: 2 }} />
              )}
            />
            <Controller
              name="workDetails"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Work Details"
                  fullWidth
                  multiline
                  rows={4}
                  sx={{ mb: 2 }}
                />
              )}
            />
            <Button type="submit" variant="contained" color="primary" fullWidth>
              {selectedExperience ? 'Update' : 'Add'}
            </Button>
          </form>
        </Box>
      </Modal>
    </Box>
  );
};
