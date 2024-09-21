import React, { useRef } from 'react';
import { Box, Typography, Grid, Divider, Card, CardContent, IconButton, Button } from '@mui/material';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import TwitterIcon from '@mui/icons-material/Twitter';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import SchoolIcon from '@mui/icons-material/School';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const Template1 = ({ data }) => {
  const resumeRef = useRef(null);

  // Function to capture and download PDF
  const handleExportPDF = async () => {
    const resumeElement = resumeRef.current;

    // Capture the resume as an image using html2canvas
    const canvas = await html2canvas(resumeElement, {
      scale: 2, // This increases the resolution of the PDF
      useCORS: true, // Allows external images to be included
    });

    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save(`${data.basicDetails.firstName}_${data.basicDetails.lastName}_Resume.pdf`);
  };

  return (
    <>
      <Box ref={resumeRef} sx={{ padding: 4, backgroundColor: '#f0f0f0', borderRadius: 2 }}>
        <Box sx={{ marginBottom: 2, textAlign: 'center' }}>
          <Typography variant="h3" sx={{ fontWeight: 'bold', fontSize: '2rem' }}>
            {`${data.basicDetails.firstName} ${data.basicDetails.lastName}`}
          </Typography>
          <Typography variant="h5" sx={{ color: 'gray', fontSize: '1.5rem' }}>
            {data.basicDetails.headline}
          </Typography>
          <Box sx={{ marginTop: 1 }}>
            <IconButton href={`https://linkedin.com/in/${data.basicDetails.linkedinId}`} target="_blank">
              <LinkedInIcon color="primary" />
            </IconButton>
            <IconButton href={`https://github.com/${data.basicDetails.githubId}`} target="_blank">
              <GitHubIcon />
            </IconButton>
            <IconButton href={`https://twitter.com/${data.basicDetails.twitterId}`} target="_blank">
              <TwitterIcon color="primary" />
            </IconButton>
          </Box>
        </Box>

        <Divider />

        <Box sx={{ marginTop: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#3f51b5', fontSize: '1.3rem' }}>
            Profile Summary
          </Typography>
          <Typography variant="body1" sx={{ marginBottom: 2, fontSize: '1.1rem' }}>
            {data.basicDetails.description1}
          </Typography>
          <Typography variant="body1" sx={{ fontSize: '1.1rem' }}>
            {data.basicDetails.description2}
          </Typography>
        </Box>

        <Divider sx={{ marginY: 3 }} />

        <Box>
          <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#3f51b5', fontSize: '1.3rem', display: 'flex', alignItems: 'center' }}>
            <BusinessCenterIcon sx={{ marginRight: 1 }} /> Experience
          </Typography>
          <Grid container spacing={2} sx={{ marginTop: 2 }}>
            {data.experience.map((exp) => (
              <Grid item xs={12} sm={6} key={exp._id}>
                <Card elevation={3}>
                  <CardContent>
                    <Typography variant="h6" sx={{ fontWeight: 'bold', fontSize: '1.2rem' }}>{exp.role}</Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ fontSize: '1rem' }}>
                      {exp.company} - {exp.location}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ fontSize: '1rem' }}>
                      {exp.duration}
                    </Typography>
                    <ul>
                      {exp.workDetails.map((detail, idx) => (
                        <li key={idx}>
                          <Typography variant="body2" sx={{ fontSize: '1rem' }}>{detail}</Typography>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        <Divider sx={{ marginY: 3 }} />

        <Box>
          <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#3f51b5', fontSize: '1.3rem', display: 'flex', alignItems: 'center' }}>
            <SchoolIcon sx={{ marginRight: 1 }} /> Education
          </Typography>
          <Grid container spacing={2} sx={{ marginTop: 2 }}>
            {data.education.map((edu) => (
              <Grid item xs={12} sm={6} key={edu._id}>
                <Card elevation={3}>
                  <CardContent>
                    <Typography variant="h6" sx={{ fontWeight: 'bold', fontSize: '1.2rem' }}>{edu.degree} - {edu.major}</Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ fontSize: '1rem' }}>
                      {edu.school} - {edu.location}
                    </Typography>
                    <ul>
                      {edu.details.map((detail, idx) => (
                        <li key={idx}>
                          <Typography variant="body2" sx={{ fontSize: '1rem' }}>{detail}</Typography>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        <Divider sx={{ marginY: 3 }} />

        <Box>
          <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#3f51b5', fontSize: '1.3rem', display: 'flex', alignItems: 'center' }}>
            <AccountTreeIcon sx={{ marginRight: 1 }} /> Projects
          </Typography>
          <Grid container spacing={2} sx={{ marginTop: 2 }}>
            {data.projects.map((project) => (
              <Grid item xs={12} sm={6} key={project._id}>
                <Card elevation={3}>
                  <CardContent>
                    <Typography variant="h6" sx={{ fontWeight: 'bold', fontSize: '1.2rem' }}>{project.title}</Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ fontSize: '1rem' }}>
                      {project.description}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ fontSize: '1rem' }}>
                      Stars: {project.stars}, Forks: {project.forks}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        <Divider sx={{ marginY: 3 }} />

        {/* Skills Section */}
        <Box>
          <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#3f51b5', fontSize: '1.3rem' }}>
            Skills
          </Typography>
          <Grid container spacing={2} sx={{ marginTop: 2 }}>
            {data.skills.map((skill, index) => (
              <Grid item xs={12} sm={6} key={index}>
                <Card elevation={3}>
                  <CardContent>
                    <Typography variant="h6" sx={{ fontWeight: 'bold', fontSize: '1.2rem' }}>{skill.name}</Typography>
                    <Typography variant="body2" sx={{ fontSize: '1rem' }}>Rating: {skill.rating}/10</Typography>
                    {skill.certifications && skill.certifications.length > 0 && (
                      <ul>
                        {skill.certifications.map((cert, idx) => (
                          <li key={idx}>
                            <Typography variant="body2" sx={{ fontSize: '1rem' }}>{cert}</Typography>
                          </li>
                        ))}
                      </ul>
                    )}
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>

      {/* Button to export the PDF */}
      <Button variant="contained" color="primary" sx={{ mt: 3 }} onClick={handleExportPDF}>
        Download Resume as PDF
      </Button>
    </>
  );
};

export default Template1;
