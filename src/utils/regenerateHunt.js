import { PUZZLE_LIBRARY } from "../data/puzzleLibrary";

// Random unique ID generator
const generateId = () =>
  Math.random().toString(36).substring(2, 10) + Date.now().toString(36);

/**
 * Selects specific puzzles from the library and assigns new random IDs.
 * @param {number[]} indexes - The indexes of puzzles from PUZZLE_LIBRARY you want in the hunt
 * @returns {Array} The generated hunt puzzle data
 */
export function regenerateHunt(indexes = []) {
  const selected = indexes.map((i) => ({
    ...PUZZLE_LIBRARY[i],
    id: generateId(),
  }));

  // Chain nextId for sequential linking
  for (let i = 0; i < selected.length - 1; i++) {
    selected[i].nextId = selected[i + 1].id;
  }
  selected[selected.length - 1].nextId = null;

  return selected;
}
