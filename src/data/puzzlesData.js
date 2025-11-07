import { PUZZLE_LIBRARY } from "./puzzleLibrary";

export const PUZZLES_DATA = [
  { ...PUZZLE_LIBRARY[16] },
  { ...PUZZLE_LIBRARY[17] },
  { ...PUZZLE_LIBRARY[18] },
  { ...PUZZLE_LIBRARY[19] },
  { ...PUZZLE_LIBRARY[20] },
  { ...PUZZLE_LIBRARY[21] },
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
