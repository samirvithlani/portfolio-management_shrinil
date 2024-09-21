import React, { useRef } from 'react';
import { Box, Typography, Grid, Divider, List, ListItem, ListItemText, Button } from '@mui/material';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const Template2 = ({ data }) => {
  console.log(data);
  const resumeRef = useRef(null); // Reference for the resume section

  // Function to download the resume as a PDF
  const handleDownloadPdf = async () => {
    const element = resumeRef.current;
    const canvas = await html2canvas(element);
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');

    const imgWidth = 210; // A4 width in mm
    const pageHeight = 295; // A4 height in mm
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    let heightLeft = imgHeight;

    let position = 0;

    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;

    // If the content is longer than one page
    while (heightLeft >= 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }

    pdf.save(`${data.basicDetails.firstName}_${data.basicDetails.lastName}_Resume.pdf`);
  };

  return (
    <Box sx={{ padding: 4, backgroundColor: '#f5f5f5', maxWidth: '800px', margin: 'auto' }}>
      <Button variant="contained" color="primary" onClick={handleDownloadPdf} sx={{ marginBottom: 2 }}>
        Download PDF
      </Button>
      <Box ref={resumeRef} sx={{ padding: 4, backgroundColor: '#ffffff' }}>
        {/* Basic Details */}
        <Box sx={{ marginBottom: 2 }}>
          <Typography variant="h4">{`${data.basicDetails.firstName} ${data.basicDetails.lastName}`}</Typography>
          <Typography variant="h6" color="textSecondary">{data.basicDetails.headline}</Typography>
          <Typography>{data.basicDetails.description1}</Typography>
          <Typography>{data.basicDetails.description2}</Typography>
        </Box>
        <Divider sx={{ marginY: 2 }} />

        {/* Links */}
        <Box sx={{ marginBottom: 2 }}>
          <Typography variant="h6">Links</Typography>
          <Typography>LinkedIn: {data.basicDetails.linkedinId}</Typography>
          <Typography>GitHub: {data.basicDetails.githubId}</Typography>
          <Typography>Twitter: {data.basicDetails.twitterId}</Typography>
          <Typography>Medium: {data.basicDetails.mediumId}</Typography>
        </Box>
        <Divider sx={{ marginY: 2 }} />

        {/* Experience */}
        <Box sx={{ marginBottom: 2 }}>
          <Typography variant="h6">Experience</Typography>
          {data.experience.map((exp, index) => (
            <Box key={index} sx={{ marginBottom: 1 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>{exp.role}</Typography>
              <Typography>{exp.company} - {exp.location} ({exp.duration})</Typography>
              <List dense>
                {exp.workDetails.map((detail, idx) => (
                  <ListItem key={idx} disableGutters>
                    <ListItemText primary={`• ${detail}`} />
                  </ListItem>
                ))}
              </List>
            </Box>
          ))}
        </Box>
        <Divider sx={{ marginY: 2 }} />

        {/* Skills */}
        <Box sx={{ marginBottom: 2 }}>
          <Typography variant="h6">Skills</Typography>
          <Grid container spacing={2}>
            {data.skills.map((skill, index) => (
              <Grid item xs={6} key={index}>
                <Typography>{`${skill.name} - Rating: ${skill.rating}/10`}</Typography>
                <Typography variant="body2" color="textSecondary">{skill.certification}</Typography>
              </Grid>
            ))}
          </Grid>
        </Box>
        <Divider sx={{ marginY: 2 }} />

        {/* Education */}
        <Box sx={{ marginBottom: 2 }}>
          <Typography variant="h6">Education</Typography>
          {data.education.map((edu, index) => (
            <Box key={index} sx={{ marginBottom: 1 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>{edu.degree}</Typography>
              <Typography>{`${edu.school}, ${edu.location} (${new Date(edu.startDate).getFullYear()} - ${new Date(edu.endDate).getFullYear()})`}</Typography>
              <List dense>
                {edu.details.map((detail, idx) => (
                  <ListItem key={idx} disableGutters>
                    <ListItemText primary={`• ${detail}`} />
                  </ListItem>
                ))}
              </List>
            </Box>
          ))}
        </Box>
        <Divider sx={{ marginY: 2 }} />

        {/* Projects */}
        <Box sx={{ marginBottom: 2 }}>
          <Typography variant="h6">Projects</Typography>
          {data.projects.map((project, index) => (
            <Box key={index} sx={{ marginBottom: 1 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>{project.title}</Typography>
              <Typography variant="body2" color="textSecondary">{`Last Updated: ${new Date(project.updatedOn).toDateString()}`}</Typography>
              <Typography>{project.description}</Typography>
              <Typography variant="body2">Repo: <a href={project.repoLink}>{project.repoLink}</a></Typography>
              <Typography variant="body2">Clone: <a href={project.cloneLink}>{project.cloneLink}</a></Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default Template2;
