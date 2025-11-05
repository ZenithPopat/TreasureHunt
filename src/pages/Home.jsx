import React from "react";
import { useNavigate } from "react-router-dom";
import { PUZZLES_DATA } from "../data/puzzlesData";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
      <div className="parchment-overlay"></div>
      <div className="vignette-overlay"></div>
      <h1 className="text-5xl md:text-7xl font-heading text-[var(--color-accent)] animate-pulse-glow mb-6 z-10">
        🌸 The Scent-ence Quest: A Whiff of Wit
      </h1>
      <p className="max-w-2xl text-[var(--color-muted)] mb-8 z-10">
        Five clues. One fragrance. Infinite banter.
      </p>
      <div className="space-x-4 z-10">
        <button
          onClick={() => navigate(`/clue/${PUZZLES_DATA[0].id}`)}
          className="glow-button-dark px-6 py-3 rounded-2xl font-semibold"
        >
          Seek the Treasure
        </button>
      </div>
    </div>
  );
}
