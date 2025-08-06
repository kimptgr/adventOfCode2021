import {
  countIncreased,
  getSlidingWindowsSums,
  resolvePartOne,
  resolvePartTwo,
} from "../day1/solutionday1.js";
import { readLinesFromFile } from "../utils/readLinesFromFile.js";
import { toNumberArray } from "../utils/toNumberArray.js";

const AdventOfCodeExample = toNumberArray(
  readLinesFromFile("test/testInputDay1.txt")
);

//##### Tests for toNumberArray

//##### Tests for countIncreased

test("returns 0 for an empty array or a single 2 element", () => {
  expect(countIncreased([])).toBe(0);
  expect(countIncreased([100])).toBe(0);
});

test("returns 1 when the second number is greater than the first", () => {
  expect(countIncreased([1, 2])).toBe(1);
});

test("returns 0 when the second number is lower or equal to the first", () => {
  expect(countIncreased([10, 9])).toBe(0);
  expect(countIncreased([10, 10])).toBe(0);
});

test("counts increases in the Advent of Code example.", () => {
  expect(countIncreased(AdventOfCodeExample)).toBe(7);
});

//##### Tests for getSlidingWindowsSums

test("returns an empty array if there are fewer than 3 elements", () => {
  expect(getSlidingWindowsSums([])).toStrictEqual([]);
  expect(getSlidingWindowsSums([100])).toStrictEqual([]);
  expect(getSlidingWindowsSums([100, 200])).toStrictEqual([]);
});

test("returns the sum of each three-measurement sliding window", () => {
  expect(getSlidingWindowsSums(AdventOfCodeExample)).toStrictEqual([
    607, 618, 618, 617, 647, 716, 769, 792,
  ]);
});

//##### Tests for resolvePartOne

test("return correct result for part one of advent of code's example", () => {
  expect(resolvePartOne(AdventOfCodeExample)).toBe(7);
});

test("return 0 for an empty array", () => {
  expect(resolvePartOne([])).toBe(0);
});
//##### Tests for resolvePartTwo

test("return correct result for part one of advent of code's example", () => {
  expect(resolvePartTwo(AdventOfCodeExample)).toBe(5);
});

test("return 0 for an empty array", () => {
  expect(resolvePartTwo([])).toBe(0);
});
