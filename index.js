import {
  resolvePartOne as day1ResolvePartOne,
  resolvePartTwo as day1ResolvePartTwo,
} from "./day1/solutionday1.js";
import { resolve as day2Resolve } from "./day2/solutionday2.js";
import {
  resolvePartOne as day3ResolvePartOne,
  resolvePartTwo as day3ResolvePartTwo,
} from "./day3/solutionday3.js";

day1ResolvePartOne();
day1ResolvePartTwo();
day2Resolve(false);
day2Resolve(true);
day3ResolvePartOne("day3/input.txt");
day3ResolvePartTwo("day3/input.txt");
