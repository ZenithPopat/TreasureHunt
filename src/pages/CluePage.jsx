import React, { useEffect, useMemo, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { PUZZLES_DATA } from "../data/puzzlesData";
import PUZZLE_TYPES from "../puzzles";
import SolvedEffect from "../effects/SolvedEffect";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function CluePage() {
  const { id } = useParams();
  const query = useQuery();
  const providedToken = query.get("hint");
  const [puzzle, setPuzzle] = useState(null);
  const [solved, setSolved] = useState(false);
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const p = PUZZLES_DATA.find((x) => x.id === id);
    setPuzzle(p || null);
    const solvedKey = `hunt_solved_${id}`;
    setSolved(localStorage.getItem(solvedKey) === "1");
  }, [id]);

  const PuzzleComponent = useMemo(() => {
    if (!puzzle) return null;
    return PUZZLE_TYPES[puzzle.puzzleType] || null;
  }, [puzzle]);

  async function handleSolvedLocal() {
    if (!puzzle) return;
    const key = `hunt_solved_${puzzle.id}`;
    localStorage.setItem(key, "1");
    setSolved(true);

    try {
      await fetch(
        "https://script.google.com/macros/s/AKfycbzwZXZlI_8JCKirxim28VKw6NLwbxmT0QImFscgiYh5sUXrRR07y6uE9oeHNjxe90J3/exec",
        {
          method: "POST",
          mode: "no-cors",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            player: localStorage.getItem("hunt_player_name") || "Guest",
            clueId: puzzle.id,
            answer: puzzle.answer,
          }),
        }
      );
      console.log("done");
    } catch (err) {
      console.error("Logging failed:", err);
    }
  }

  if (!puzzle) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="parchment-overlay"></div>
        <div className="vignette-overlay"></div>
        <div className="max-w-xl text-center z-10">
          <h2 className="text-3xl font-heading mb-4 text-[var(--color-accent)]">
            Clue not found
          </h2>
          <p className="text-[var(--color-muted)]">
            Check that the link is correct or use a printed QR from the hunt
            master.
          </p>
        </div>
      </div>
    );
  }

  const releaseDate = puzzle.releaseDate ? new Date(puzzle.releaseDate) : null;
  const isLocked = releaseDate && now < releaseDate;
  const remainingMs = releaseDate ? releaseDate - now : 0;
  const hours = Math.floor((remainingMs / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((remainingMs / (1000 * 60)) % 60);
  const seconds = Math.floor((remainingMs / 1000) % 60);

  // 🎬 Show cinematic “Locked” screen if not yet open
  if (isLocked) {
    return (
      <div className="relative min-h-screen flex items-center justify-center p-6 text-center overflow-hidden">
        {/* <CinematicScene /> */}
        <div className="absolute inset-0 bg-black/70 backdrop-blur-sm"></div>

        <div className="relative z-10 max-w-lg bg-black/40 border border-yellow-700 rounded-2xl p-8 shadow-xl animate-fade-in">
          <h1 className="text-4xl font-heading text-yellow-300 mb-4 animate-pulse">
            🔒 Locked for Now
          </h1>
          <p className="text-lg text-yellow-200 mb-2">
            The next clue will reveal itself on{" "}
            <span className="font-bold text-yellow-400">
              {releaseDate.toLocaleDateString(undefined, {
                weekday: "long",
                month: "long",
                day: "numeric",
              })}
            </span>
          </p>

          <div className="mt-4 text-2xl text-yellow-300 font-mono">
            ⏰ {hours}h {minutes}m {seconds}s
          </div>

          <p className="mt-4 italic text-yellow-400/80 text-sm">
            "Patience is the key to every vault…"
          </p>
        </div>
      </div>
    );
  }

  const hintUnlocked = providedToken === puzzle.hintToken;

  return (
    <div className="min-h-screen flex items-start justify-center p-6 pt-20">
      <SolvedEffect solved={solved} />
      <div className="parchment-overlay"></div>
      <div className="vignette-overlay"></div>
      <div className="max-w-3xl w-full bg-white/5 backdrop-blur rounded p-6 border z-10">
        <h1 className="text-4xl font-heading text-[var(--color-accent)] mb-2 text-center">
          {puzzle.title}
        </h1>
        {/* <h3 className="text-sm text-[var(--color-muted)] mb-4">
          For: <span className="font-semibold">{puzzle.player}</span>
        </h3> */}
        <div className="prose mb-4 text-[var(--color-map)] text-center">
          {/* {puzzle.storyline} */}
          <div dangerouslySetInnerHTML={{ __html: puzzle.storyline }} />
        </div>

        {!solved ? (
          <div>
            {PuzzleComponent ? (
              <PuzzleComponent puzzle={puzzle} onSolved={handleSolvedLocal} />
            ) : (
              <div className="p-4">This puzzle type is not supported yet.</div>
            )}
            {hintUnlocked ? (
              <div className="mt-4 text-sm text-[var(--color-muted)]">
                {puzzle.hint}
              </div>
            ) : (
              <p className="mt-4 text-sm text-yellow-400 italic">
                Hint is locked. Complete the task to unlock.
              </p>
            )}
          </div>
        ) : (
          <div
            className="p-4 rounded bg-white/10 mt-6 transform animate-fade-in-up"
            style={{ animationDuration: "1s", animationFillMode: "forwards" }}
          >
            <h4 className="font-medium mb-2 text-yellow-400 text-2xl animate-pulse-glow">
              Well done.
            </h4>
            <div className="text-[var(--color-accent)]">
              <div dangerouslySetInnerHTML={{ __html: puzzle.continuation }} />
              {/* {puzzle.continuation || "The story continues..."}{" "} */}
            </div>
            {puzzle.nextId && (
              <div className="mt-2 text-sm">
                {puzzle.nextIsOnline ? (
                  <>
                    Next Clue:{" "}
                    <a
                      href={`/clue/${puzzle.nextId}`}
                      className="underline text-[var(--color-accent)] hover:text-[var(--color-secondary)]"
                    >
                      Click here
                    </a>
                  </>
                ) : (
                  puzzle.nextClue && (
                    <>
                      Next Clue: {puzzle.nextClue || "Offline clue available"}{" "}
                    </>
                  )
                )}
              </div>
            )}
            {/* {puzzle.nextId && (
              <div className="mt-4 text-sm">
                Share the next link:{" "}
                <code>
                  {window.location.origin}/clue/{puzzle.nextId}
                </code>
              </div>
            )} */}
          </div>
        )}
      </div>
    </div>
  );
}
