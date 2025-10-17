import React, { useState } from "react";

export default function PuzzleMediaAV({ puzzle, onSolved }) {
  const [input, setInput] = useState("");
  const [msg, setMsg] = useState(null);

  const checkAnswer = () => {
    const expected = (puzzle.answer || "").toString().toLowerCase().trim();
    const given = (input || "").toLowerCase().trim();

    if (given === expected) {
      setMsg("Correct!");
      onSolved();
    } else {
      setMsg("Incorrect, try again.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto text-center">
      {puzzle.puzzleType === "audio" && (
        <audio controls className="mb-3 w-full">
          <source src={puzzle.mediaUrl} type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
      )}

      {puzzle.puzzleType === "video" && (
        <video controls className="mb-3 w-full rounded" autoPlay muted>
          <source src={puzzle.mediaUrl} type="video/mp4" />
          Your browser does not support the video element.
        </video>
      )}

      <input
        type="text"
        placeholder="Type your answer"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="p-2 rounded w-full text-center border border-amber-200 mb-2"
      />
      <div>
        <button onClick={checkAnswer} className="glow-button px-4 py-2 rounded">
          Submit
        </button>
      </div>
      {msg && <p className="mt-2">{msg}</p>}
    </div>
  );
}
