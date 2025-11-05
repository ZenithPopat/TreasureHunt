import React, { useState } from "react";

export default function PuzzleInput({ puzzle, onSolved }) {
  const [input, setInput] = useState("");
  const [msg, setMsg] = useState("");

  const caesarDecode = (text, shift = 3) => {
    const aCode = "a".charCodeAt(0);
    return text
      .split("")
      .map((ch) => {
        const lower = ch.toLowerCase();
        if (lower >= "a" && lower <= "z") {
          return String.fromCharCode(
            ((lower.charCodeAt(0) - aCode - shift + 26) % 26) + aCode
          );
        }
        return ch;
      })
      .join("");
  };

  const checkAnswer = () => {
    const expected = (puzzle.answer || "").toLowerCase().trim();
    const given = (input || "").toLowerCase().trim();

    let correct = false;

    if (puzzle.puzzleCategory === "caesar" && puzzle.clue) {
      const decoded = caesarDecode(puzzle.clue, 3).toLowerCase().trim();
      if (given === decoded || given === expected) correct = true;
    } else {
      if (given === expected) correct = true;
    }

    if (correct) {
      setMsg("Correct! 🎉 Proceed to the next clue.");
      onSolved();
    } else {
      setMsg("Incorrect. Try again!");
    }
  };

  return (
    <div className="max-w-2xl mx-auto text-center">
      {puzzle.clue && (
        <div className="p-3 bg-white/10 rounded mb-3 whitespace-pre-line">
          {puzzle.clue}
        </div>
      )}

      {/* <p className="mb-2 font-medium">{puzzle.storyline}</p> */}

      {/* {puzzle.hint && (
        <p className="mb-2 text-sm text-[var(--color-muted)]">
          Hint: {puzzle.hint}
        </p>
      )} */}

      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter your answer"
        className="p-2 rounded w-full border border-amber-200 text-center mb-3"
      />
      <button onClick={checkAnswer} className="glow-button px-4 py-2 rounded">
        Submit
      </button>
      {msg && <p className="mt-3 text-sm">{msg}</p>}
    </div>
  );
}
