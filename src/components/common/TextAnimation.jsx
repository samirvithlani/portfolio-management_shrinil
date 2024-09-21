import React, { useEffect } from "react";
import gsap from "gsap";
import '../../assets/css/text.anim.css'

const TextAnimation = (props) => {
  //const text = "Hello, GSAP World!";

  useEffect(() => {
    // Select all characters and add GSAP hover animations
    const chars = document.querySelectorAll(".char");
    chars.forEach(char => {
      char.addEventListener("mouseenter", () => {
        gsap.to(char, {
          y: -20,
          scale: 1.3,
          duration: 0.3,
          ease: "bounce.out"
        });
      });

      char.addEventListener("mouseleave", () => {
        gsap.to(char, {
          y: 0,
          scale: 1,
          duration: 0.3,
          ease: "bounce.out"
        });
      });
    });
  }, []);

  return (
    <div className="text">
      {props.text.split("").map((char, index) => (
        <span key={index} className="char">
          {char}
        </span>
      ))}
    </div>
  );
};

export default TextAnimation;
