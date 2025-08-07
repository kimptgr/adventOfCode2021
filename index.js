import { readLinesFromFile } from "./utils/readLinesFromFile.js";
import {
  resolvePartOne as day1ResolvePartOne,
  resolvePartTwo as day1ResolvePartTwo,
} from "./day1/solutionday1.js";
import { resolve as day2Resolve } from "./day2/solutionday2.js";
import {
  resolvePartOne as day3ResolvePartOne,
  resolvePartTwo as day3ResolvePartTwo,
  parseBinaryLines,
  INPUT_PATH as INPUT_PATH_DAY_3,
} from "./day3/solutionDay3.js";

day1ResolvePartOne();
day1ResolvePartTwo();
day2Resolve(false);
day2Resolve(true);
const bits = parseBinaryLines(readLinesFromFile(INPUT_PATH_DAY_3));
day3ResolvePartOne(bits);
day3ResolvePartTwo(bits);
