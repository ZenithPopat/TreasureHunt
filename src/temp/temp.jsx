import React, { useState, useEffect } from "react";

// --- SAMPLE PUZZLES (JSON) ---
const DEFAULT_PUZZLES = {
  intro: {
    title: "Welcome",
    content: "Welcome to the Treasure Hunt! Start at clue 1.",
    next: "clue1",
  },
  clue1: {
    title: "Old Bollywood Hint",
    type: "caesar", // built-in solver type
    cipherText: "khoor", // 'hello' shifted by 3 as example
    hint: "It's a simple Caesar shift (try shift 3)",
    nextOnSolve: "clue2",
  },
  clue2: {
    title: "Prayer Spot",
    type: "text",
    content:
      "Look near the small temple in the backyard. The word you'll find is 'SHRI'.",
    expectedAnswer: "shri",
    nextOnSolve: "final",
  },
  final: {
    title: "Final Surprise",
    type: "final",
    content: "Congratulations! Use code: JAMNAGAR27 when you meet them.",
    next: null,
  },
};

// Utility: Caesar decode
function caesarDecode(s, shift) {
  return s.replace(/[a-z]/gi, (c) => {
    const base = c >= "a" && c <= "z" ? 97 : 65;
    const code = ((((c.charCodeAt(0) - base - shift) % 26) + 26) % 26) + base;
    return String.fromCharCode(code);
  });
}

export default function App() {
  const [puzzles, setPuzzles] = useState(() => {
    const raw = localStorage.getItem("hunt_puzzles_v1");
    return raw ? JSON.parse(raw) : DEFAULT_PUZZLES;
  });
  const [current, setCurrent] = useState(
    () => localStorage.getItem("hunt_current") || "intro"
  );
  const [adminOpen, setAdminOpen] = useState(false);
  const [adminText, setAdminText] = useState(JSON.stringify(puzzles, null, 2));
  const [message, setMessage] = useState("");

  useEffect(() => {
    localStorage.setItem("hunt_puzzles_v1", JSON.stringify(puzzles));
  }, [puzzles]);

  useEffect(() => {
    localStorage.setItem("hunt_current", current);
  }, [current]);

  const goTo = (id) => {
    if (!puzzles[id]) {
      setMessage("That clue doesn't exist.");
      return;
    }
    setMessage("");
    setCurrent(id);
  };

  const handleAdminSave = () => {
    try {
      const parsed = JSON.parse(adminText);
      setPuzzles(parsed);
      setAdminOpen(false);
      setMessage("Saved puzzles.");
    } catch (e) {
      setMessage("JSON parse error: " + e.message);
    }
  };

  const renderClue = (id) => {
    const c = puzzles[id];
    if (!c) return <div className="p-4">Missing clue.</div>;
    switch (c.type) {
      case "caesar":
        return (
          <div className="space-y-4">
            <p className="italic">{c.hint}</p>
            <div className="bg-gray-100 p-4 rounded">
              Cipher: <code>{c.cipherText}</code>
            </div>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5, 6].map((s) => (
                <button
                  key={s}
                  onClick={() => {
                    const plain = caesarDecode(c.cipherText, s).toLowerCase();
                    if (c.nextOnSolve) {
                      setMessage(
                        `Decoded with shift ${s}: ${plain}. Moving to next.`
                      );
                      goTo(c.nextOnSolve);
                    } else setMessage(`Decoded with shift ${s}: ${plain}`);
                  }}
                  className="px-3 py-1 border rounded"
                >
                  Try shift {s}
                </button>
              ))}
            </div>
          </div>
        );
      case "text":
        return (
          <ClueText
            clue={c}
            onSolved={() => {
              if (c.nextOnSolve) goTo(c.nextOnSolve);
            }}
          />
        );
      case "final":
        return (
          <div className="prose">
            <h3>{c.title}</h3>
            <p>{c.content}</p>
          </div>
        );
      default:
        return (
          <div>
            <h3>{c.title}</h3>
            <p>{c.content}</p>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-50 p-6">
      <div className="max-w-3xl mx-auto bg-white shadow-md rounded-2xl p-6">
        <header className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold">Treasure Hunt — Demo</h1>
          <div className="flex gap-2">
            <button
              onClick={() => setAdminOpen(true)}
              className="px-3 py-1 border rounded"
            >
              Admin
            </button>
            <button
              onClick={() => {
                localStorage.clear();
                setPuzzles(DEFAULT_PUZZLES);
                setCurrent("intro");
                setMessage("Reset done.");
              }}
              className="px-3 py-1 border rounded"
            >
              Reset
            </button>
          </div>
        </header>

        <main className="mt-6 grid gap-6 md:grid-cols-3">
          <section className="md:col-span-2">
            <div className="rounded p-4 border">{renderClue(current)}</div>
            <div className="mt-4 text-sm text-slate-600">{message}</div>
          </section>

          <aside className="p-4 border rounded">
            <h4 className="font-medium">Clues</h4>
            <ul className="mt-2 space-y-2">
              {Object.keys(puzzles).map((id) => (
                <li key={id} className="flex items-center justify-between">
                  <button
                    onClick={() => goTo(id)}
                    className="text-left underline"
                  >
                    {id}
                  </button>
                  <span className="text-xs text-slate-500">
                    {puzzles[id].title}
                  </span>
                </li>
              ))}
            </ul>
            <div className="mt-4">
              <button
                onClick={() => {
                  // shareable URL pattern: /hunt?id=clue1
                  const url = `${window.location.origin}${window.location.pathname}?clue=${current}`;
                  navigator.clipboard?.writeText(url);
                  setMessage("Shareable link copied to clipboard.");
                }}
                className="px-3 py-1 border rounded"
              >
                Copy share link
              </button>
            </div>
          </aside>
        </main>

        <footer className="mt-6 text-xs text-slate-500">
          Built for quick demos — split components & add a backend for
          production.
        </footer>
      </div>

      {/* Admin modal */}
      {adminOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4">
          <div className="bg-white max-w-3xl w-full rounded p-4">
            <h3 className="font-semibold">Edit puzzles (JSON)</h3>
            <textarea
              value={adminText}
              onChange={(e) => setAdminText(e.target.value)}
              className="w-full h-64 mt-2 p-2 border rounded font-mono text-sm"
            />
            <div className="flex gap-2 mt-2 justify-end">
              <button
                onClick={() => setAdminOpen(false)}
                className="px-3 py-1 border rounded"
              >
                Close
              </button>
              <button
                onClick={handleAdminSave}
                className="px-3 py-1 bg-slate-800 text-white rounded"
              >
                Save
              </button>
            </div>
            <p className="mt-2 text-xs text-slate-500">
              Tip: you can create reusable puzzle entries and change cipherText
              / expectedAnswer per recipient.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

function ClueText({ clue, onSolved }) {
  const [ans, setAns] = useState("");
  const [note, setNote] = useState("");
  return (
    <div className="space-y-3">
      <h3 className="font-semibold">{clue.title}</h3>
      <p>{clue.content}</p>
      <input
        className="w-full p-2 border rounded"
        value={ans}
        onChange={(e) => setAns(e.target.value)}
        placeholder="Type answer"
      />
      <div className="flex gap-2">
        <button
          onClick={() => {
            if (
              ans.trim().toLowerCase() ===
              (clue.expectedAnswer || "").toLowerCase()
            ) {
              setNote("Correct!");
              onSolved();
            } else setNote("Not correct — try again.");
          }}
          className="px-3 py-1 border rounded"
        >
          Submit
        </button>
        <button
          onClick={() => {
            setAns("");
            setNote("");
          }}
          className="px-3 py-1 border rounded"
        >
          Clear
        </button>
      </div>
      <div className="text-sm text-slate-600">{note}</div>
    </div>
  );
}
