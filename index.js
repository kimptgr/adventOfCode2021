import {
  resolvePartOne as day1ResolvePartOne,
  resolvePartTwo as day1ResolvePartTwo,
} from "./day1/solutionDay1.js";
import { resolve as day2Resolve } from "./day2/solutionDay2.js";
import {
  resolvePartOne as day3ResolvePartOne,
  resolvePartTwo as day3ResolvePartTwo,
} from "./day3/solutionDay3.js";

day1ResolvePartOne();
day1ResolvePartTwo();
day2Resolve(false);
day2Resolve(true);
day3ResolvePartOne();
day3ResolvePartTwo();
