import { countIncreased } from "./solutionday1.js";
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
  expect(
    countIncreased([
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
    ])
  ).toBe(7);
});
