import React, { useRef } from 'react';
import { Box, Typography, Grid, Divider, Paper, Avatar } from '@mui/material';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const NewTemplate = ({ data }) => {
  const printRef = useRef(); // Reference for the printable content

  // Function to download the resume as a PDF
  const handleDownload = () => {
    const input = printRef.current;
    html2canvas(input, { scale: 2 }).then((canvas) => { // Increased scale for better quality
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4'); // Define A4 size
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const imgRatio = imgWidth / imgHeight;
      const pdfRatio = pdfWidth / pdfHeight;

      if (imgRatio > pdfRatio) {
        const imgScaledHeight = pdfWidth / imgRatio;
        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, imgScaledHeight);
      } else {
        const imgScaledWidth = pdfHeight * imgRatio;
        pdf.addImage(imgData, 'PNG', 0, 0, imgScaledWidth, pdfHeight);
      }

      pdf.save('new_resume.pdf');
    });
  };

  return (
    <>
      <button
        onClick={handleDownload}
        style={{
          marginBottom: '20px',
          padding: '10px 20px',
          backgroundColor: '#4CAF50',
          color: '#fff',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
        }}
      >
        Download Resume as PDF
      </button>

      <Paper
        elevation={3}
        sx={{
          padding: 4,
          backgroundColor: '#f5f5f5', // Light background
          color: '#333', // Text color
          borderRadius: '10px',
        }}
        ref={printRef}
      >
        <Grid container>
          {/* Header with Avatar */}
          <Grid item xs={12} textAlign="center" sx={{ backgroundColor: '#2E3B55', padding: 4 }}>
            <Avatar
              alt={data.basicDetails.firstName}
              src={data.basicDetails.avatar} // Image URL from data
              sx={{ width: 100, height: 100, margin: '0 auto' }}
            />
            <Typography variant="h3" fontWeight="bold" color="white">
              {`${data.basicDetails.firstName} ${data.basicDetails.lastName}`}
            </Typography>
            <Typography variant="h5" color="#CCCCCC">
              {data.basicDetails.headline}
            </Typography>
          </Grid>

          <Divider />

          {/* Left Column: Skills, Contact Info */}
          <Grid item xs={4} sx={{ padding: 3 }}>
            <Typography variant="h6" fontWeight="bold" color="primary">
              Contact
            </Typography>
            <Typography>{data.user.email}</Typography>
            <Typography>{data.user.phone}</Typography>
            <Typography>{data.user.location}</Typography>

            <Divider sx={{ my: 2 }} />

            <Typography variant="h6" fontWeight="bold" color="primary">
              Soft Skills
            </Typography>
            {data.skills
              .filter((skill) => skill.rating >= 8)
              .map((skill, index) => (
                <Typography key={index}>• {skill.name}</Typography>
              ))}

            <Divider sx={{ my: 2 }} />

            <Typography variant="h6" fontWeight="bold" color="primary">
              Certifications
            </Typography>
            {data.skills.map((skill, index) => (
              <Typography key={index}>• {skill.certification}</Typography>
            ))}
          </Grid>

          {/* Right Column: Summary, Education, Experience */}
          <Grid item xs={8} sx={{ padding: 3 }}>
            <Typography variant="h6" fontWeight="bold" color="primary">
              Summary
            </Typography>
            <Typography paragraph>
              {data.basicDetails.description1} {data.basicDetails.description2}
            </Typography>

            <Divider sx={{ my: 2 }} />

            <Typography variant="h6" fontWeight="bold" color="primary">
              Education
            </Typography>
            {data.education.map((edu, index) => (
              <Box key={index} mb={2}>
                <Typography variant="subtitle1" fontWeight="bold">
                  {edu.degree} - {edu.school}
                </Typography>
                <Typography variant="body2">
                  {edu.startDate.split('T')[0]} - {edu.endDate.split('T')[0]}
                </Typography>
              </Box>
            ))}

            <Divider sx={{ my: 2 }} />

            <Typography variant="h6" fontWeight="bold" color="primary">
              Experience
            </Typography>
            {data.experience.map((exp, index) => (
              <Box key={index} mb={2}>
                <Typography variant="subtitle1" fontWeight="bold">
                  {exp.role} at {exp.company}
                </Typography>
                <Typography variant="body2">{exp.duration}</Typography>
                <Typography variant="body2">{exp.location}</Typography>
              </Box>
            ))}

            <Divider sx={{ my: 2 }} />

            <Typography variant="h6" fontWeight="bold" color="primary">
              Projects
            </Typography>
            {data.projects.map((project, index) => (
              <Box key={index} mb={2}>
                <Typography variant="subtitle1" fontWeight="bold">
                  {project.title}
                </Typography>
                <Typography variant="body2">{project.description}</Typography>
                <Typography variant="body2">
                  Repo: <a href={project.repoLink}>{project.repoLink}</a>
                </Typography>
              </Box>
            ))}
          </Grid>
        </Grid>
      </Paper>
    </>
  );
};

export default NewTemplate;
