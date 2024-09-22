import React, { useEffect, useState } from "react";
import {
  Grid,
  TextField,
  Button,
  Stepper,
  Step,
  StepLabel,
  Box,
  Typography,
  InputAdornment,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { useForm, useFieldArray } from "react-hook-form";
import { LinkedIn, GitHub, Twitter } from "@mui/icons-material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const steps = [
  "Basic Details",
  "Experience",
  "Skills and Projects",
  "Education",
  "Projects",
];

const CreatePortfolio = () => {
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {}, []);

  const [openDialog, setOpenDialog] = useState(false);
  useEffect(() => {
    setOpenDialog(true); // Show the dialog when the component mounts
  }, []);

  const handleConfirm = async () => {
    try {
      // Call the API to delete the old profile
      const portfolioId = localStorage.getItem("portfolioId");
      await axios.delete("/creator-profile/delete/"+portfolioId); // Replace with your actual endpoint

      // Proceed with your form submission or any other logic here
      handleNext(); // Move to the next step after confirmation

      // Close the dialog
      setOpenDialog(false);
    } catch (error) {
      console.error("Error deleting old profile:", error);
    }
  };

  const handleCancel = () => {
    setOpenDialog(false); // Close the dialog without doing anything
    navigate("/user/main"); // Redirect to the main page
  };

  const { control, handleSubmit, register } = useForm({
    defaultValues: {
      basicDetails: {
        firstName: "",
        lastName: "",
        headline: "",
        linkedinId: "",
        githubId: "",
        twitterId: "",
        mediumId: "",
        description1: "",
        description2: "",
      },
      experience: [
        {
          role: "",
          company: "",
          duration: "",
          location: "",
          workDetails: ["", "", ""],
        },
      ],
      skills: [{ name: "", rating: "", certification: "" }],
      education: [
        {
          degree: "",
          major: "",
          school: "",
          location: "",
          startDate: "",
          endDate: "",
          details: ["", "", ""],
          courses: [""],
        },
      ],
      projects: [
        {
          title: "",
          date: "",
          description: "",
          repoLink: "",
          cloneLink: "",
          stars: "",
          forks: "",
          updatedOn: "",
        },
      ],
    },
  });

  const { fields: experienceFields, append: appendExperience } = useFieldArray({
    control,
    name: "experience",
  });

  const { fields: skillsFields, append: appendSkills } = useFieldArray({
    control,
    name: "skills",
  });

  const { fields: educationFields, append: appendEducation } = useFieldArray({
    control,
    name: "education",
  });

  const { fields: projectFields, append: appendProject } = useFieldArray({
    control,
    name: "projects",
  });

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const navigate = useNavigate();
  const onSubmit = async (data) => {
    console.log("Form Data Submitted:", data);
    Object.assign(data, { user: localStorage.getItem("id") });
    const res = await axios.post("/creator-profile", data);
    console.log("Response:", res);
    navigate("/user/main");
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Dialog open={openDialog} onClose={handleCancel}>
        <DialogTitle>Confirm Action</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to continue? This will delete your old profile
            and generate a new one.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirm} color="secondary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>

      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <Box sx={{ padding: 3 }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          {activeStep === 0 && (
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  {...register("basicDetails.firstName")}
                  label="First Name"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  {...register("basicDetails.lastName")}
                  label="Last Name"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  {...register("basicDetails.headline")}
                  label="Headline"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  {...register("basicDetails.linkedinId")}
                  label="LinkedIn ID"
                  fullWidth
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LinkedIn />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  {...register("basicDetails.githubId")}
                  label="GitHub ID"
                  fullWidth
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <GitHub />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  {...register("basicDetails.twitterId")}
                  label="Twitter ID"
                  fullWidth
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Twitter />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  {...register("basicDetails.mediumId")}
                  label="Medium ID"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  {...register("basicDetails.description1")}
                  label="Description 1"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  {...register("basicDetails.description2")}
                  label="Description 2"
                  fullWidth
                />
              </Grid>
            </Grid>
          )}

          {activeStep === 1 && (
            <Box>
              {experienceFields.map((field, index) => (
                <Box key={field.id} sx={{ marginBottom: 2 }}>
                  <Typography variant="h6">Experience {index + 1}</Typography>
                  <TextField
                    {...register(`experience.${index}.role`)}
                    label="Role"
                    fullWidth
                  />
                  <TextField
                    {...register(`experience.${index}.company`)}
                    label="Company"
                    fullWidth
                  />
                  <TextField
                    {...register(`experience.${index}.duration`)}
                    label="Duration"
                    fullWidth
                  />
                  <TextField
                    {...register(`experience.${index}.location`)}
                    label="Location"
                    fullWidth
                  />
                  {field.workDetails.map((_, detailIndex) => (
                    <TextField
                      key={detailIndex}
                      {...register(
                        `experience.${index}.workDetails.${detailIndex}`
                      )}
                      label={`Work Detail ${detailIndex + 1}`}
                      fullWidth
                      sx={{ marginTop: 1 }}
                    />
                  ))}
                </Box>
              ))}
              <Button
                variant="outlined"
                onClick={() =>
                  appendExperience({
                    role: "",
                    company: "",
                    duration: "",
                    location: "",
                    workDetails: ["", "", ""],
                  })
                }
              >
                Add More Experience
              </Button>
            </Box>
          )}

          {activeStep === 2 && (
            <Box>
              {skillsFields.map((field, index) => (
                <Box key={field.id} sx={{ marginBottom: 2 }}>
                  <Typography variant="h6">Skill {index + 1}</Typography>
                  <TextField
                    {...register(`skills.${index}.name`)}
                    label="Skill Name"
                    fullWidth
                  />
                  <TextField
                    {...register(`skills.${index}.rating`)}
                    label="Rating (0-10)"
                    fullWidth
                  />
                  <TextField
                    {...register(`skills.${index}.certification`)}
                    label="Certification"
                    fullWidth
                  />
                </Box>
              ))}
              <Button
                variant="outlined"
                onClick={() =>
                  appendSkills({ name: "", rating: "", certification: "" })
                }
              >
                Add More Skills
              </Button>
            </Box>
          )}

          {activeStep === 3 && (
            <Box>
              {educationFields.map((field, index) => (
                <Box key={field.id} sx={{ marginBottom: 2 }}>
                  <Typography variant="h6">Education {index + 1}</Typography>
                  <TextField
                    {...register(`education.${index}.degree`)}
                    label="Degree"
                    fullWidth
                  />
                  <TextField
                    {...register(`education.${index}.major`)}
                    label="Major"
                    fullWidth
                  />
                  <TextField
                    {...register(`education.${index}.school`)}
                    label="School"
                    fullWidth
                  />
                  <TextField
                    {...register(`education.${index}.location`)}
                    label="Location"
                    fullWidth
                  />
                  <TextField
                    {...register(`education.${index}.startDate`)}
                    label="Start Date"
                    type="date"
                    fullWidth
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                  <TextField
                    {...register(`education.${index}.endDate`)}
                    label="End Date"
                    type="date"
                    fullWidth
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />

                  {field.details.map((_, detailIndex) => (
                    <TextField
                      key={detailIndex}
                      {...register(`education.${index}.details.${detailIndex}`)}
                      label={`Degree Detail ${detailIndex + 1}`}
                      fullWidth
                      sx={{ marginTop: 1 }}
                    />
                  ))}
                  {field.courses.map((_, courseIndex) => (
                    <TextField
                      key={courseIndex}
                      {...register(`education.${index}.courses.${courseIndex}`)}
                      label={`Course ${courseIndex + 1}`}
                      fullWidth
                      sx={{ marginTop: 1 }}
                    />
                  ))}
                </Box>
              ))}
              <Button
                variant="outlined"
                onClick={() =>
                  appendEducation({
                    degree: "",
                    major: "",
                    school: "",
                    location: "",
                    startDate: "",
                    endDate: "",
                    details: ["", "", ""],
                    courses: [""],
                  })
                }
              >
                Add More Education
              </Button>
            </Box>
          )}

          {activeStep === 4 && (
            <Box>
              {projectFields.map((field, index) => (
                <Box key={field.id} sx={{ marginBottom: 2 }}>
                  <Typography variant="h6">Project {index + 1}</Typography>
                  <TextField
                    {...register(`projects.${index}.title`)}
                    label="Project Title"
                    fullWidth
                  />
                  <TextField
                    {...register(`projects.${index}.date`)}
                    label="Date"
                    type="date"
                    fullWidth
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                  <TextField
                    {...register(`projects.${index}.description`)}
                    label="Description"
                    fullWidth
                    multiline
                    rows={3}
                  />
                  <TextField
                    {...register(`projects.${index}.repoLink`)}
                    label="Repository Link"
                    fullWidth
                  />
                  <TextField
                    {...register(`projects.${index}.cloneLink`)}
                    label="Clone Link"
                    fullWidth
                  />
                  <TextField
                    {...register(`projects.${index}.stars`)}
                    label="Stars"
                    fullWidth
                  />
                  <TextField
                    {...register(`projects.${index}.forks`)}
                    label="Forks"
                    fullWidth
                  />
                  <TextField
                    {...register(`projects.${index}.updatedOn`)}
                    label="Last Updated On"
                    type="date"
                    fullWidth
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Box>
              ))}
              <Button
                variant="outlined"
                onClick={() =>
                  appendProject({
                    title: "",
                    date: "",
                    description: "",
                    repoLink: "",
                    cloneLink: "",
                    stars: "",
                    forks: "",
                    updatedOn: "",
                  })
                }
              >
                Add More Projects
              </Button>
            </Box>
          )}

          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}>
            <Button
              variant="contained"
              disabled={activeStep === 0}
              onClick={handleBack}
            >
              Back
            </Button>
            {activeStep === steps.length - 1 ? (
              <Button type="submit" variant="contained">
                Submit
              </Button>
            ) : (
              <Button variant="contained" onClick={handleNext}>
                Next
              </Button>
            )}
          </Box>
        </form>
      </Box>
    </Box>
  );
};

export default CreatePortfolio;
