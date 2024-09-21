import React, { useState, useEffect } from "react";
import {
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Typography,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Snackbar,
  Alert
} from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import axios from "axios";

function ProjectCard({ project, onEdit, onDelete }) {
  const {
    title,
    date,
    description,
    repoLink,
    cloneLink,
    starts,
    forks,
    updatedOn,
  } = project;

  return (
    <Card sx={{ marginBottom: 3 }}>
      <CardContent>
        <Grid container justifyContent="space-between">
          <Typography variant="h6">{title}</Typography>
          <Typography variant="subtitle2" color="textSecondary">
            {new Date(date).toLocaleDateString()}
          </Typography>
        </Grid>
        <Divider sx={{ marginY: 2 }} />
        <Typography variant="body2" sx={{ marginBottom: 2 }}>
          {description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          variant="contained"
          color="primary"
          startIcon={<GitHubIcon />}
          href={cloneLink}
        >
          Clone Project
        </Button>
        <Button
          variant="contained"
          color="success"
          startIcon={<GitHubIcon />}
          href={repoLink}
          target="_blank"
        >
          View Repo
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          onClick={() => onEdit(project)}
        >
          Edit
        </Button>
        <Button
          variant="outlined"
          color="error"
          onClick={() => onDelete(project._id)}
        >
          Delete
        </Button>
      </CardActions>
      <Divider />
      <CardContent>
        <Grid container justifyContent="space-between">
          <Typography variant="caption">
            <GitHubIcon /> Stars: {starts}
          </Typography>
          <Typography variant="caption" color="textSecondary">
            Forks: {forks}
          </Typography>
          <Typography variant="caption" color="textSecondary">
            Updated on {new Date(updatedOn).toLocaleDateString()}
          </Typography>
        </Grid>
      </CardContent>
    </Card>
  );
}

function ProjectForm({ open, handleClose, project, onSubmit }) {
  const [formValues, setFormValues] = useState({
    title: "",
    date: "",
    description: "",
    repoLink: "",
    cloneLink: "",
    starts: 0,
    forks: 0,
    updatedOn: "",
  });

  useEffect(() => {
    if (project) {
      setFormValues({
        title: project.title || "",
        date: project.date || "",
        description: project.description || "",
        repoLink: project.repoLink || "",
        cloneLink: project.cloneLink || "",
        starts: project.starts || 0,
        forks: project.forks || 0,
        updatedOn: project.updatedOn || "",
      });
    }
  }, [project]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = () => {
    onSubmit({ ...formValues, projectId: project?._id });
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{project ? "Edit Project" : "Add New Project"}</DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          margin="normal"
          label="Title"
          name="title"
          value={formValues.title}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Date"
          name="date"
          type="date"
          value={formValues.date}
          onChange={handleChange}
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Description"
          name="description"
          value={formValues.description}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Repository Link"
          name="repoLink"
          value={formValues.repoLink}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Clone Link"
          name="cloneLink"
          value={formValues.cloneLink}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Stars"
          name="starts"
          type="number"
          value={formValues.starts}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Forks"
          name="forks"
          type="number"
          value={formValues.forks}
          onChange={handleChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSubmit} variant="contained">
          {project ? "Update" : "Add"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default function CreatorProjects({ projects, id, fetchData }) {
  const [open, setOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const handleEdit = (project) => {
    setSelectedProject(project);
    setOpen(true);
  };

  const handleAddNew = () => {
    setSelectedProject(null); // Clear form for adding new project
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (projectData) => {
    try {
      const response = await axios({
        method: projectData.projectId ? 'put' : 'post',
        url: `/creator-profile/updateproject/${id || ''}`,
        data: projectData,
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      // Handle successful response
      setSnackbarMessage(projectData.projectId ? 'Project updated successfully' : 'Project added successfully');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
      fetchData();
    } catch (error) {
      // Handle error response
      setSnackbarMessage('Failed to update project');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
      console.error('Error updating project:', error);
      fetchData();
    }
  };

  const handleDelete = async (projectId) => {
    try {
      const res = await axios.put(`/creator-profile/removeproject/${id}`, {
        data: { projectId },
      });
      console.log('Project deleted:', res.data);

      setSnackbarMessage('Project deleted successfully');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
      fetchData();
    } catch (error) {
      setSnackbarMessage('Failed to delete project');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
      console.error('Error deleting project:', error);
      fetchData();
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <div>
      <Button
        variant="contained"
        color="primary"
        onClick={handleAddNew}
        sx={{ marginBottom: 3 }}
      >
        Add New Project
      </Button>
      <Grid container spacing={2}>
        {projects?.map((project) => (
          <Grid item xs={12} sm={6} key={project._id}>
            <ProjectCard
              project={project}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          </Grid>
        ))}
      </Grid>
      <ProjectForm
        open={open}
        handleClose={handleClose}
        project={selectedProject}
        onSubmit={handleSubmit}
      />
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
}
