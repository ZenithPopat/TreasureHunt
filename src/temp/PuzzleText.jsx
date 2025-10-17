import React, { useState } from "react";

export default function PuzzleText({ puzzle, onSolved }) {
  const [input, setInput] = useState("");
  const [msg, setMsg] = useState(null);

  const check = () => {
    const expected = (puzzle.answer || "")
      .toString()
      .toLowerCase()
      .replace(/[^a-z0-9]/g, "");
    const given = (input || "")
      .toString()
      .toLowerCase()
      .replace(/[^a-z0-9]/g, "");
    if (given && given === expected) {
      setMsg("Correct!");
      onSolved();
    } else {
      setMsg("Try again.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto text-center">
      <p className="mb-4">{puzzle.clue}</p>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="p-2 rounded w-full text-accent text-center border border-amber-200"
        placeholder="Answer"
      />
      <div className="mt-3 flex justify-center gap-3">
        <button onClick={check} className="glow-button px-4 py-2 rounded">
          Submit
        </button>
      </div>
      {msg && <p className="mt-3 text-sm">{msg}</p>}
    </div>
  );
}
