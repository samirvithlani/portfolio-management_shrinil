import React, { useEffect, useState } from "react";
import { Box, Link, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const StickyHeader = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check local storage for the user's ID
  useEffect(() => {
    const userId = localStorage.getItem("id");
    if (userId) {
      setIsLoggedIn(true);
    }
  }, []);

  // Logout function
  const navigate = useNavigate()
  const handleLogout = () => {
    localStorage.removeItem("id"); // Remove id from localStorage
    setIsLoggedIn(false); // Update state
    navigate('/')

  };

  return (
    <Box
      sx={{
        position: "sticky",
        top: 0,
        backgroundColor: "#496AB4",
        zIndex: 1100,
        padding: "16px",
        borderBottom: "1px solid #ddd",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        boxSizing: "border-box",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)"
      }}
    >
      <Typography variant="h5" sx={{ fontWeight: "bold" }}>
        MySite
      </Typography>
      <Box sx={{ display: "flex", gap: "24px" }}>
        <Link href="/user/main" underline="none" color="inherit" sx={{ fontSize: "18px" }}>
          Home
        </Link>
        <Link href="/user/resume" underline="none" color="inherit" sx={{ fontSize: "18px" }}>
          Build Resume
        </Link>
        <Link href="/user/create" underline="none" color="inherit" sx={{ fontSize: "18px" }}>
          Create
        </Link>
        {isLoggedIn ? (
          <Button onClick={handleLogout} sx={{ color: "#fff", fontSize: "18px" }}>
            Logout
          </Button>
        ) : (
          <Link href="/" underline="none" color="inherit" sx={{ fontSize: "18px" }}>
            Login
          </Link>
        )}
      </Box>
    </Box>
  );
};

export default StickyHeader;
