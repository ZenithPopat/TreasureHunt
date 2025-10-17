import React, { useState, useEffect } from "react";
import Confetti from "react-confetti";

export default function SolvedEffect({ solved }) {
  const [dimensions, setDimensions] = useState({
    width: document.documentElement.scrollWidth,
    height: document.documentElement.scrollHeight,
  });
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        width: document.documentElement.scrollWidth,
        height: document.documentElement.scrollHeight,
      });
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (solved) {
      setShowConfetti(true);
      const timer = setTimeout(() => setShowConfetti(false), 15000); // 10 seconds
      return () => clearTimeout(timer);
    }
  }, [solved]);

  if (!showConfetti) return null;

  return (
    <Confetti
      width={dimensions.width}
      height={dimensions.height}
      recycle={false}
      numberOfPieces={150}
      gravity={0.03}
      wind={0.002}
      initialVelocityY={1.5} // gentle downward speed
      initialVelocityX={0.3} // gentle horizontal spread
      colors={[
        "#d4af37", // gold
        "#b87333", // copper
        "#cd7f32", // bronze
        "#cfa66e", // amber
        "#8b5e3c", // deep brown
        "#f0e5c9", // parchment
      ]}
      // confettiSource={{ x: dimensions.width / 2, y: 0, w: dimensions.width, h: 0 }}
    />
  );
}
