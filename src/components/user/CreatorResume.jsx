import React, { useState, useEffect } from 'react';
import { Button, Box, Typography } from '@mui/material';
import { jsPDF } from 'jspdf';
import axios from 'axios';
import html2canvas from 'html2canvas'; // Import html2canvas
import Template1 from './Template1';
import Template2 from './Template2';
import Template3 from './Template3';
import NewTemplate from './NewTemplate';

const templates = {
  template1: Template1,
  template2: Template2,
  template3: Template3,
  newTemplate: NewTemplate,
};

export const CreatorResume = () => {
  const [selectedTemplate, setSelectedTemplate] = useState('template1');
  const [resumeData, setResumeData] = useState(null);

  useEffect(() => {
    // Replace 'your-api-endpoint' with the actual endpoint you are using
    axios.get('creator-profile/user/'+localStorage.getItem('id'))
      .then(response => {
        setResumeData(response.data);
      })
      .catch(error => {
        console.error('Error fetching resume data:', error);
      });
  }, []);

  const handleDownload = () => {
    if (!resumeData) return;

    const doc = new jsPDF();
    const Template = templates[selectedTemplate];
    
    // Render the selected template to a canvas
    const templateId = selectedTemplate;
    html2canvas(document.querySelector(`#${templateId}`)).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      doc.addImage(imgData, 'PNG', 0, 0);
      doc.save('resume.pdf');
    }).catch(error => {
      console.error('Error capturing template:', error);
    });
  };

  const TemplateComponent = templates[selectedTemplate];

  return (
    <Box>
      <Typography variant="h5">Select Resume Template</Typography>
      <Button onClick={() => setSelectedTemplate('template1')}>Template 1</Button>
      <Button onClick={() => setSelectedTemplate('template2')}>Template 2</Button>
      <Button onClick={() => setSelectedTemplate('template3')}>Template 3</Button>
      <Button onClick={() => setSelectedTemplate('newTemplate')}>Template 4</Button>

      <Box sx={{ marginTop: 2 }}>
        {resumeData && (
          <div id={selectedTemplate}> {/* Ensure the id matches what is queried by html2canvas */}
            <TemplateComponent data={resumeData} />
          </div>
        )}
      </Box>

      <Button variant="contained" color="primary" onClick={handleDownload}>
        Download Resume
      </Button>
    </Box>
  );
};
