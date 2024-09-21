import React from "react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

const FancyParticles = () => {
  const particlesInit = async (main) => {
    await loadFull(main);
  };

  return (
    <div style={{ position: "relative", height: "100vh", backgroundColor: "#282c34" }}>
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
          fullScreen: { enable: false },
          background: {
            color: {
              value: "#282c34",
            },
          },
          fpsLimit: 60,
          particles: {
            number: {
              value: 100,
              density: {
                enable: true,
                area: 800,
              },
            },
            color: {
              value: ["#00FFFC", "#FC00FF", "#fffc00"], // Color variation
            },
            shape: {
              type: ["circle", "star"],
              stroke: {
                width: 0,
              },
            },
            opacity: {
              value: 0.8,
              random: true,
              anim: {
                enable: true,
                speed: 1,
                opacity_min: 0.1,
                sync: false,
              },
            },
            size: {
              value: { min: 3, max: 7 },
              random: true,
              anim: {
                enable: true,
                speed: 5,
                size_min: 0.1,
                sync: false,
              },
            },
            links: {
              enable: true,
              distance: 150,
              color: "#ffffff",
              opacity: 0.4,
              width: 1,
            },
            move: {
              enable: true,
              speed: 2,
              direction: "none",
              random: false,
              straight: false,
              outModes: {
                default: "out",
              },
            },
          },
          interactivity: {
            events: {
              onClick: {
                enable: true,
                mode: "push",
              },
              onHover: {
                enable: true,
                mode: "repulse",
              },
              resize: true,
            },
            modes: {
              grab: {
                distance: 400,
                lineLinked: {
                  opacity: 1,
                },
              },
              bubble: {
                distance: 400,
                size: 40,
                duration: 2,
                opacity: 0.8,
              },
              repulse: {
                distance: 100,
              },
              push: {
                quantity: 4,
              },
              remove: {
                quantity: 2,
              },
            },
          },
          detectRetina: true,
        }}
      />
      <div style={{
        position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)",
        textAlign: "center", color: "white", fontFamily: "Arial, sans-serif"
      }}>
        <h1 style={{ fontSize: "4rem", marginBottom: "0.5rem" }}>Hello, I'm [Your Name]</h1>
        <p style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>A Creative Developer</p>
        <button style={{
          padding: "10px 20px", fontSize: "1rem", background: "linear-gradient(45deg, #00FFFC, #FC00FF)",
          border: "none", borderRadius: "5px", color: "white", cursor: "pointer"
        }}>
          View My Work
        </button>
      </div>
    </div>
  );
};

export default FancyParticles;
