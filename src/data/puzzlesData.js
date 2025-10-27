import { PUZZLE_LIBRARY } from "./puzzleLibrary";

export const PUZZLES_DATA = [
  { ...PUZZLE_LIBRARY[11] },
  { ...PUZZLE_LIBRARY[12] },
  { ...PUZZLE_LIBRARY[13] },
  { ...PUZZLE_LIBRARY[14] },
  { ...PUZZLE_LIBRARY[15] },
  // { ...PUZZLE_LIBRARY[5] },
  // { ...PUZZLE_LIBRARY[6] },
  // { ...PUZZLE_LIBRARY[7] },
  // { ...PUZZLE_LIBRARY[8] },
  // { ...PUZZLE_LIBRARY[9] },
  // { ...PUZZLE_LIBRARY[10] },
];

for (let i = 0; i < PUZZLES_DATA.length - 1; i++) {
  PUZZLES_DATA[i].nextId = PUZZLES_DATA[i + 1].id;
}
PUZZLES_DATA[PUZZLES_DATA.length - 1].nextId = null;
