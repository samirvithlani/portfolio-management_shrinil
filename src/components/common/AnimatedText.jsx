import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

const AnimatedText = ({ text }) => {
  const textRef = useRef(null);

  useEffect(() => {
    if (!text || !textRef.current) return; // Ensure text exists before animating

    const textElements = textRef.current.children;

    gsap.fromTo(
      textElements,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.2,  // delay between each letter/word
        ease: "power2.out"
      }
    );
  }, [text]); // Re-run the animation if the `text` prop changes

  return (
    <div style={{ fontSize: "2rem", fontWeight: "bold" }}>
      <span ref={textRef}>
        {text?.split("").map((char, index) => (
          <span key={index} style={{ display: "inline-block" }}>
            {char === " " ? "\u00A0" : char}
          </span>
        ))}
      </span>
    </div>
  );
};

export default AnimatedText;
