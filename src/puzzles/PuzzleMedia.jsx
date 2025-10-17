import React, { useState } from "react";

export default function PuzzleMedia({ puzzle, onSolved }) {
  const [code, setCode] = useState("");
  const [msg, setMsg] = useState("");

  const checkCode = () => {
    const expected = (puzzle.answer || "").toLowerCase().trim();
    if (code.toLowerCase().trim() === expected) {
      setMsg("Correct! 🎉 You may proceed to the next clue.");
      onSolved();
    } else {
      setMsg("Incorrect code. Please wait for verification or try again.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto text-center">
      <p className="mb-2 text-sm text-[var(--color-muted)]">
        Instructions: Record the chant/video and send it to me via
        WhatsApp/Telegram. I'll send you the code to unlock the next clue.
      </p>

      <input
        type="text"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        placeholder="Enter verification code"
        className="p-2 rounded w-full border border-amber-200 text-center mb-3"
      />

      <div>
        <button onClick={checkCode} className="glow-button px-4 py-2 rounded">
          Submit
        </button>
      </div>

      {msg && <p className="mt-3 text-sm">{msg}</p>}
    </div>
  );
}
