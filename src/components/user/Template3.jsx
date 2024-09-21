import React, { useRef } from "react";
import { Box, Typography, Grid, Divider, Paper } from "@mui/material";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const Template3 = ({ data }) => {
  const printRef = useRef(); // Reference for the printable content

  // Function to download the resume as a PDF
  const handleDownload = async () => {
    const input = printRef.current;

    // Adjust the canvas for high-resolution display
    const scale = 2; // Increase for better quality
    const canvas = await html2canvas(input, {
      scale, // Use a higher scale for better quality
      useCORS: true, // Enable cross-origin resource sharing if needed
    });

    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("portrait", "mm", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    // Add the image to the PDF
    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save("resume.pdf");
  };

  return (
    <>
      {/* Button to download the resume as PDF */}
      <button
        onClick={handleDownload}
        style={{
          marginBottom: "20px",
          padding: "10px 20px",
          backgroundColor: "#4CAF50",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Download Resume as PDF
      </button>

      {/* Resume Content */}
      <Paper
        elevation={3}
        sx={{
          padding: 4,
          backgroundColor: "#f5f5f5", // Light background
          color: "#333", // Text color
          borderRadius: "10px",
          width: "210mm", // A4 width
          minHeight: "297mm", // A4 height
          margin: "auto", // Center the resume
        }}
        ref={printRef}
      >
        {/* Header */}
        <Box
          textAlign="center"
          mb={4}
          sx={{
            backgroundColor: "#2E3B55",
            padding: "20px",
            borderRadius: "5px",
          }}
        >
          <Typography variant="h3" fontWeight="bold" color="white">
            {`${data.basicDetails.firstName} ${data.basicDetails.lastName}`}
          </Typography>
          <Typography variant="h5" color="#CCCCCC">
            {data.basicDetails.headline}
          </Typography>
        </Box>

        <Divider />

        {/* Content */}
        <Grid container spacing={4} mt={3}>
          {/* Left Column */}
          <Grid item xs={4}>
            {/* Contact Info */}
            <Typography variant="h6" fontWeight="bold" color="primary">
              Contact
            </Typography>
            <Typography>{data.user.email}</Typography>

            <Divider sx={{ my: 2 }} />

            {/* Technical Skills */}
            <Typography variant="h6" fontWeight="bold" color="primary">
              Technical Skills
            </Typography>
            {data.skills.map((skill, index) => (
              <Typography key={index} variant="body2">
                • {skill.name} (Rating: {skill.rating}/10)
              </Typography>
            ))}

            <Divider sx={{ my: 2 }} />

            {/* Projects */}
            <Typography variant="h6" fontWeight="bold" color="primary">
              Projects
            </Typography>
            {data.projects.map((project, index) => (
              <Typography key={index} variant="body2">
                • {project.title}: {project.description}
              </Typography>
            ))}
          </Grid>

          {/* Right Column */}
          <Grid item xs={8}>
            {/* Summary */}
            <Typography variant="h6" fontWeight="bold" color="primary">
              Summary
            </Typography>
            <Typography paragraph>
              {data.basicDetails.description1} {data.basicDetails.description2}
            </Typography>

            <Divider sx={{ my: 2 }} />

            {/* Education */}
            <Typography variant="h6" fontWeight="bold" color="primary">
              Education
            </Typography>
            {data.education.map((edu, index) => (
              <Box key={index} mb={2}>
                <Typography variant="subtitle1" fontWeight="bold">
                  {edu.degree} - {edu.school}
                </Typography>
                <Typography variant="body2">
                  {edu.startDate.split("T")[0]} - {edu.endDate.split("T")[0]}
                </Typography>
                <Typography variant="body2">
                  Details: {edu.details.join(", ")}
                </Typography>
              </Box>
            ))}

            <Divider sx={{ my: 2 }} />

            {/* Experience */}
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
                <Typography variant="body2">
                  Details: {exp.workDetails.join(", ")}
                </Typography>
              </Box>
            ))}
          </Grid>
        </Grid>
      </Paper>
    </>
  );
};

export default Template3;
