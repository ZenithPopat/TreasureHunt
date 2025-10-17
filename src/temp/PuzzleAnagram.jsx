import React, { useState } from "react";

function normalize(s = "") {
  return s
    .toString()
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "");
}

function sorted(s = "") {
  return normalize(s).split("").sort().join("");
}

export default function PuzzleAnagram({ puzzle, onSolved }) {
  const [input, setInput] = useState("");
  const [msg, setMsg] = useState(null);

  const check = () => {
    if (sorted(input) === sorted(puzzle.answer)) {
      setMsg("Correct!");
      onSolved();
    } else {
      setMsg("Not quite — try rearranging the letters.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto text-center">
      <p className="mb-2">Ciphertext:</p>
      <div className="p-3 bg-white/10 rounded mb-3">{puzzle.clue}</div>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="p-2 rounded w-full text-accent text-center border border-amber-200"
        placeholder="Your rearrangement"
      />
      <div className="mt-3">
        <button onClick={check} className="glow-button px-4 py-2 rounded">
          Submit
        </button>
      </div>
      {msg && <p className="mt-3 text-sm">{msg}</p>}
    </div>
  );
}
