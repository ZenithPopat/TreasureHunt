import PuzzleMedia from "./PuzzleMedia";
import PuzzleInput from "./PuzzleInput";
import PuzzleVisual from "./PuzzleVisual";
import PuzzleMediaAV from "./PuzzleMediaAV";

export const PUZZLE_TYPES = {
  input: PuzzleInput,
  media: PuzzleMedia,
  visual: PuzzleVisual,
  audio: PuzzleMediaAV,
  video: PuzzleMediaAV,
};

export default PUZZLE_TYPES;
