import React, { useState } from "react";

function caesarDecode(text, shift = 3) {
  const aCode = "a".charCodeAt(0);
  return text
    .split("")
    .map((ch) => {
      const lower = ch.toLowerCase();
      if (lower >= "a" && lower <= "z") {
        const decoded = String.fromCharCode(
          ((lower.charCodeAt(0) - aCode - shift + 26) % 26) + aCode
        );
        return decoded;
      }
      return ch;
    })
    .join("");
}

export default function PuzzleCaesar({ puzzle, onSolved }) {
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
    const decoded = caesarDecode(puzzle.clue || "", 3)
      .toLowerCase()
      .replace(/[^a-z0-9]/g, "");

    if ((given && given === expected) || (given && given === decoded)) {
      setMsg("Correct!");
      onSolved();
    } else {
      setMsg("Try decoding the ciphertext or type the plaintext answer.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto text-center">
      <p className="mb-2 font-medium">Ciphertext:</p>
      <div className="p-3 bg-white/10 rounded mb-3">{puzzle.clue}</div>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="p-2 rounded w-full text-accent text-center border border-amber-200"
        placeholder="Decoded answer"
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
