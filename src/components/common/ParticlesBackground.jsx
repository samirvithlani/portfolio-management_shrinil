import React from "react";
import { Particles } from "react-tsparticles";
import { loadFull } from "tsparticles";

const ParticlesBackground = () => {
  const particlesInit = async (main) => {
    await loadFull(main);
  };

  return (
    <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", overflow: "hidden", zIndex: -1 }}>
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
          background: {
            color: {
              value: "#f0f4f8", // Adjust background color as needed
            },
          },
          fpsLimit: 60,
          particles: {
            number: {
              value: 50,
            },
            size: {
              value: 3,
            },
            move: {
              enable: true,
              speed: 2,
            },
            opacity: {
              value: 0.7,
            },
            links: {
              enable: true,
              color: "#000",
            },
          },
        }}
      />
    </div>
  );
};

export default ParticlesBackground;
