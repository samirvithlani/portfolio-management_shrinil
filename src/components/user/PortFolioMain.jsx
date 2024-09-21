import { Box, createTheme, ThemeProvider, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import { AboutCreator } from "./AboutCreator";
import { CreatorExperiance } from "./CreatorExperiance";
import { CreatorSkills } from "./CreatorSkills";
import CreatorProjects from "./CreatorProjects";
import CreatorEducation from "./CreatorEducation";
import axios from "axios";

export const PortFolioMain = () => {
  const defaultTheme = createTheme();
  const [portfolio, setPortfolio] = useState();

  const fetchLoggedinUserData = async () => {
    const id = localStorage.getItem("id");
    const res = await axios.get("creator-profile/user/" + id);
    console.log(res.data);
    setPortfolio(res.data);
  };

  useEffect(() => {
    fetchLoggedinUserData();
  }, []);

  return (
    <ThemeProvider theme={defaultTheme}>
      <Box
        sx={{
          backgroundColor: "rgb(238,242,246)",
          width: "100%", // Ensure it takes the full viewport width
          fontFamily: "Lato",
          padding: "20px",
          display: "flex",
          flexDirection: "column",
          gap: "24px", // Space between components
          boxSizing: "border-box", // Include padding and border in element's total width and height
          overflowX: "hidden", // Prevent horizontal overflow
          //overflowY: "hidden", // Handle overflow if content is larger than the viewport
        }}
      >
        <Grid container spacing={3}>
          {/* About Creator */}
          <Grid item xs={12}>
            <Box
              sx={{
                padding: "20px",
                backgroundColor: "#fff",
                borderRadius: "8px",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                marginBottom: "24px", // Add bottom margin to avoid overlap
              }}
            >
              <AboutCreator
                detail={portfolio?.basicDetails}
                user={portfolio?.user}
                fetchData={fetchLoggedinUserData}
              />
            </Box>
          </Grid>

          {/* Creator Experience */}
          <Grid item xs={12}>
            <Box
              sx={{
                padding: "20px",
                backgroundColor: "#fff",
                borderRadius: "8px",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                marginBottom: "24px", // Add bottom margin to avoid overlap
              }}
            >
              <CreatorExperiance
                experiance={portfolio?.experience}
                id={portfolio?._id}
                fetchData={fetchLoggedinUserData}
              />
            </Box>
          </Grid>

          {/* Creator Projects */}
          <Grid item xs={12}>
            <Box
              sx={{
                padding: "20px",
                backgroundColor: "#496AB4",
                borderRadius: "8px",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
              }}
            >
              <CreatorProjects
                projects={portfolio?.projects}
                id={portfolio?._id}
                fetchData={fetchLoggedinUserData}
              />
            </Box>
          </Grid>

          {/* Creator Education */}
          <Grid item xs={12}>
            <Box
              sx={{
                padding: "20px",
                backgroundColor: "#fff",
                borderRadius: "8px",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
              }}
            >
              <CreatorEducation education={portfolio?.education} />
            </Box>
          </Grid>

          {/* Creator Skills */}
          <Grid item xs={12}>
            <Box
              sx={{
                padding: "20px",
                backgroundColor: "#496AB4",
                borderRadius: "8px",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
              }}
            >
              <CreatorSkills skills={portfolio?.skills} />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </ThemeProvider>
  );
};
