import { countIncreased, getSlidingWindowsSums } from "./solutionday1.js";

const AdventOfCodeExample = [
  "199",
  "200",
  "208",
  "210",
  "200",
  "207",
  "240",
  "269",
  "260",
  "263",
];
test("returns 0 for an empty array", () => {
  expect(countIncreased([])).toBe(0);
});

test("returns 0 when there is only one element", () => {
  expect(countIncreased(["100"])).toBe(0);
});

test("returns 1 when the second number is higher", () => {
  expect(countIncreased(["100", "200"])).toBe(1);
});

test("counts how many measurements are larger than the previous one in the Advent of Code example.", () => {
  expect(countIncreased(AdventOfCodeExample)).toBe(7);
});

test("returns an empty array if there are fewer than 3 elements", () => {
  expect(getSlidingWindowsSums([])).toStrictEqual([]);
  expect(getSlidingWindowsSums(["100"])).toStrictEqual([]);
  expect(getSlidingWindowsSums(["100", "200"])).toStrictEqual([]);
});

test("returns the sum of each three-measurement sliding window", () => {
  expect(getSlidingWindowsSums(AdventOfCodeExample)).toStrictEqual([
    607, 618, 618, 617, 647, 716, 769, 792,
  ]);
});
