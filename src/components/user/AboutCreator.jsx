import React from "react";
import { Box, Typography, Avatar, IconButton } from "@mui/material";
import {
  Twitter,
  Instagram,
  Facebook,
  GitHub,
  LinkedIn,
} from "@mui/icons-material";
import TextAnimation from "../common/TextAnimation";
import AnimatedText from "../common/AnimatedText";

export const AboutCreator = ({ detail, user,fetchData }) => {
  return (
    <>
    <Typography variant="h4" sx={{ color: "black", textAlign:"center",marginBottom: "16px" }}>
        About The Creator
      </Typography>
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#fff",
        padding: { xs: "10px", sm: "20px" }, // Adjust padding for different screen sizes
        borderRadius: "8px",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        //width: '100%', // Make width 100% of the viewport
        //maxWidth: '100%',
        margin: "0 auto",
        textAlign: "center",
        minHeight: "500px", // Use minHeight instead of fixed height for responsiveness
        height: "100vh", // Adjust height to fill the viewport
        background: "linear-gradient(to right, #4b6cb7, #182848)",
      }}
    >
      
      {/* Your content here */}

      {/* Creator Avatar */}
      {/* <Avatar
        alt={`${detail?.firstName ?? "Creator"} ${detail?.lastName ?? ""}`}
        src="https://via.placeholder.com/150" // You can replace this with a real image
        sx={{ width: 120, height: 120, marginBottom: "16px" }}
      /> */}

      {/* Creator Name */}
      <Typography variant="h4" sx={{ fontWeight: "bold", marginBottom: "20px" }}>
        <TextAnimation
          text={`${detail?.firstName ?? "Creator"} ${detail?.lastName ?? ""}`}
        />
      </Typography>

      {/* Creator Bio */}
      <Typography
        variant="h5"
        sx={{ color: "text.secondary", marginBottom: "16px" }}
      >
        <AnimatedText text={detail?.description1}/>
        {/* {detail?.description1 ?? "No description available"} */}
      </Typography>

      {/* Social Media Icons */}
      <Box sx={{ display: "flex", justifyContent: "center", gap: "10px" }}>
        {detail?.twitterId && (
          <IconButton
            href={detail.twitterId}
            target="_blank"
            rel="noopener noreferrer"
            sx={{ color: "black" }}
          >
            <Twitter />
          </IconButton>
        )}
        {detail?.instagramId && (
          <IconButton
            href={detail.instagramId}
            target="_blank"
            rel="noopener noreferrer"
            sx={{ color: "black" }}
          >
            <Instagram />
          </IconButton>
        )}
        {detail?.facebookId && (
          <IconButton
            href={detail.facebookId}
            target="_blank"
            rel="noopener noreferrer"
            sx={{ color: "black" }}
          >
            <Facebook />
          </IconButton>
        )}
        {detail?.githubId && (
          <IconButton
            href={detail.githubId}
            target="_blank"
            rel="noopener noreferrer"
            sx={{ color: "black" }}
          >
            <GitHub />
          </IconButton>
        )}
        {detail?.linkedinId && (
          <IconButton
            href={detail.linkedinId}
            target="_blank"
            rel="noopener noreferrer"
            sx={{ color: "black" }}
          >
            <LinkedIn />
          </IconButton>
        )}
      </Box>
    </Box>
    </>
  );
};
