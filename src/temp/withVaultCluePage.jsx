import React, { useEffect, useMemo, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { PUZZLES_DATA } from "../data/puzzlesData";
import PUZZLE_TYPES from "../puzzles";
import SolvedEffect from "../effects/SolvedEffect";
import CinematicScene from "../components/CinematicScene";
import VaultPage from "./VaultPage";
import FinalePage from "./FinalePage";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function CluePage() {
  const { id: paramId } = useParams();
  console.log(paramId);
  const query = useQuery();
  const providedToken = query.get("hint");
  const [puzzle, setPuzzle] = useState(null);
  const [solved, setSolved] = useState(false);

  const path = location.pathname.toLowerCase();
  const isVault = path.includes("/vault");
  const isFinale = path.includes("/finale");
  const pageId = isVault ? "vault" : isFinale ? "finale" : paramId;
  console.log(pageId);

  useEffect(() => {
    const p = PUZZLES_DATA.find((x) => x.id === pageId);
    setPuzzle(p || null);
    const solvedKey = `hunt_solved_${pageId}`;
    setSolved(localStorage.getItem(solvedKey) === "1");
    console.log(p, solvedKey);
  }, [pageId]);

  const PuzzleComponent = useMemo(() => {
    if (!puzzle) return null;
    return PUZZLE_TYPES[puzzle.puzzleType] || null;
  }, [puzzle]);

  function handleSolvedLocal() {
    if (!puzzle) return;
    const key = `hunt_solved_${puzzle.id}`;
    localStorage.setItem(key, "1");
    setSolved(true);
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

  const hintUnlocked = providedToken === puzzle.hintToken;
  const pageClass = isVault ? "vault-bg" : isFinale ? "finale-bg" : "map-bg";

  return (
    <div
      className={`min-h-screen flex items-start justify-center p-6 pt-20 ${pageClass}`}
    >
      <SolvedEffect solved={solved} />
      {isVault && <VaultPage solved={solved} />}
      {isFinale && <FinalePage solved={solved} />}
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
          {puzzle.storyline}
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
            <p className="text-[var(--color-accent)]">
              {puzzle.continuation || "The story continues..."}{" "}
            </p>
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
                  <>Next Clue: {puzzle.nextClue || "Offline clue available"} </>
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
