import React from "react";
import { useForm } from "react-hook-form";
import { TextField, Button, Box, Typography, Paper } from "@mui/material";
import { styled } from "@mui/system";
import bg from "../../assets/images/bg.jpg";
import TextAnimation from "./TextAnimation";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Background = styled(Box)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
  backgroundImage: `url(${bg})`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  flexDirection: "column",
});

const FormContainer = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  maxWidth: "400px",
  width: "100%",
  textAlign: "center",
  backgroundColor: "rgba(255, 255, 255, 0.8)",
}));

export const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const onSubmit = async(data) => {
    //console.log(data);
    const res = await axios.post("/user/login", data);
    console.log(res);
    if (res.status === 200) {
      console.log("Login successful");
      localStorage.setItem("id", res.data.data._id);
      navigate("/user/main");

    } else {
      console.log("Login failed");
    }

    
  };

  return (
    <Background>
      <Box sx={{ textAlign: "center", marginBottom: 8, }}>
        <TextAnimation text={"Welcome  To Login"} />
      </Box>

      <FormContainer elevation={3}>
        <Typography variant="h5" gutterBottom>
          Login
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
            {...register("email", { required: "Email is required" })}
            error={!!errors.email}
            helperText={errors.email?.message}
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            {...register("password", { required: "Password is required" })}
            error={!!errors.password}
            helperText={errors.password?.message}
          />
          <Button variant="contained" color="primary" type="submit" fullWidth>
            Login
          </Button>
          <Typography variant="body2" gutterBottom>
            Don't have an account? <Link to="/register">Register</Link>
          </Typography>
        </form>
      </FormContainer>
    </Background>
  );
};
