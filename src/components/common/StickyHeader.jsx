import React from "react";
import { Box, Link, Typography } from "@mui/material";

const StickyHeader = () => {
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
        width: "100%",  // Ensures the header spans the full width
        boxSizing: "border-box", // Include padding and border in element's total width and height
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)"  // Optional for added effect
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
          build resume
        </Link>
        
        <Link href="/user/create" underline="none" color="inherit" sx={{ fontSize: "18px" }}>
          Create
        </Link>
      </Box>
    </Box>
  );
};

export default StickyHeader;
