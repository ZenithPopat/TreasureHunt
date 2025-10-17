import React, { useState } from "react";

export default function PuzzleVisual({ puzzle, onSolved }) {
  const [input, setInput] = useState("");
  const [msg, setMsg] = useState(null);

  const checkAnswer = () => {
    const expected = (puzzle.answer || "").toLowerCase().trim();
    const given = (input || "").toLowerCase().trim();

    if (given === expected) {
      setMsg("Correct!");
      onSolved();
    } else {
      setMsg("Try again!");
    }
  };

  return (
    <div className="max-w-2xl mx-auto text-center">
      {puzzle.imageUrl && (
        <img
          src={puzzle.imageUrl}
          alt="Puzzle Hint"
          className="mx-auto mb-4 rounded shadow-lg border border-yellow-300"
        />
      )}
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter your answer"
        className="p-2 rounded w-full text-center border border-amber-200"
      />
      <div className="mt-3">
        <button onClick={checkAnswer} className="glow-button px-4 py-2 rounded">
          Submit
        </button>
      </div>
      {msg && <p className="mt-3 text-sm">{msg}</p>}
    </div>
  );
}
