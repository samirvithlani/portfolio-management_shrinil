import React from "react";
import { useForm } from "react-hook-form";
import { TextField, Button, Paper, Box, Typography } from "@mui/material";
import { styled } from "@mui/system";
import backgroundImg from "../../assets/images/background.jpg"; // Adjust the path as needed
import axios from "axios";
import { useNavigate } from "react-router-dom";

const FormContainer = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  maxWidth: "500px",
  width: "100%",
  margin: "auto",
  backgroundColor: "#D48356", // Black background color
  borderRadius: theme.shape.borderRadius,
  zIndex: 1, // Ensure form stays above background
  position: "relative", // Ensure form stays above background
}));

const BackgroundContainer = styled(Box)(({ theme }) => ({
  position: "relative",
  height: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  backgroundImage: `url(${backgroundImg})`, // Set background image
  backgroundSize: "cover",
  backgroundPosition: "center",
}));

const UserRegistration = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    console.log(data);

    const res = await axios.post("/user/create",data);
    if (res.status === 201) {
      navigate("/");
    } else {
      navigate("/register");
    }
  };

  return (
    <BackgroundContainer>
      <FormContainer elevation={3}>
        <Typography variant="h4" gutterBottom textAlign="center" color="#fff">
          User Registration
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label>First Name :</label>
          <TextField
            placeholder="First Name"
            label="First Name"
            variant="outlined"
            fullWidth
            margin="normal"
            {...register("firstName", { required: "First name is required" })}
            error={!!errors.firstName}
            helperText={errors.firstName?.message}
            sx={{
              backgroundColor: "#fff", // White background for input fields
              "& .MuiInputBase-input": {
                color: "#000", // Black text color for input fields
              },
              "& .MuiFormLabel-root": {
                color: "#fff", // White label color
              },
            }}
          />
          <label>Last Name :</label>
          <TextField
            placeholder="Last Name"
            label="Last Name"
            variant="outlined"
            fullWidth
            margin="normal"
            {...register("lastName", { required: "Last name is required" })}
            error={!!errors.lastName}
            helperText={errors.lastName?.message}
            sx={{
              backgroundColor: "#fff",
              "& .MuiInputBase-input": {
                color: "#000",
              },
              "& .MuiFormLabel-root": {
                color: "#fff",
              },
            }}
          />
          <label>Email:</label>
          <TextField
            placeholder="Email"
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
            {...register("email", { required: "Email is required" })}
            error={!!errors.email}
            helperText={errors.email?.message}
            sx={{
              backgroundColor: "#fff",
              "& .MuiInputBase-input": {
                color: "#000",
              },
              "& .MuiFormLabel-root": {
                color: "#fff",
              },
            }}
          />
          <label>Password :</label>
          <TextField
            placeholder="Password"
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            {...register("password", { required: "Password is required" })}
            error={!!errors.password}
            helperText={errors.password?.message}
            sx={{
              backgroundColor: "#fff",
              "& .MuiInputBase-input": {
                color: "#000",
              },
              "& .MuiFormLabel-root": {
                color: "#fff",
              },
            }}
          />
          <Button
            variant="contained"
            color="primary"
            type="submit"
            fullWidth
            sx={{ marginTop: 2 }}
          >
            Register
          </Button>
        </form>
      </FormContainer>
    </BackgroundContainer>
  );
};

export default UserRegistration;
