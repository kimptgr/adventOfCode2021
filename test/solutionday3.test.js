import {
  parseBinaryLines,
  countBitsPerPosition,
  calculateRates,
  binaryArrayToDecimal,
  calculateOxygenCO2Rating,
  resolvePartOne,
  resolvePartTwo,
} from "../day3/solutionDay3.js";
import { readLinesFromFile } from "../utils/readLinesFromFile.js";

const adventOfCodeExamplePath = "test/testInputDay3.txt";
const adventOfCodeExampleLines = readLinesFromFile(adventOfCodeExamplePath);
const adventOfCodeExampleBits = parseBinaryLines(adventOfCodeExampleLines);

//##### Tests for parseBinaryLines
test("convert lines of binary strings to 2D array of numbers", () => {
  const lines = ["00100", "11110"];
  const bits = [
    [0, 0, 1, 0, 0],
    [1, 1, 1, 1, 0],
  ];
  expect(parseBinaryLines(lines)).toStrictEqual(bits);
});

test("filters out non-binary strings", () => {
  const lines = ["1101", "1234", "hello", 1010, "0011"];
  const bits = [
    [1, 1, 0, 1],
    [0, 0, 1, 1],
  ];
  expect(parseBinaryLines(lines)).toStrictEqual(bits);
});

//##### Tests for countBitsPerPosition

test("returns bits per column", () => {
  const [onesCount, zerosCount] = [
    [7, 5, 8, 7, 5],
    [5, 7, 4, 5, 7],
  ];
  expect(countBitsPerPosition(adventOfCodeExampleBits)).toStrictEqual([
    onesCount,
    zerosCount,
  ]);
});

test("counts bits for a given position", () => {
  const [onesCount, zerosCount] = [7, 5];
  expect(countBitsPerPosition(adventOfCodeExampleBits, 0)).toStrictEqual([
    onesCount,
    zerosCount,
  ]);
});

//##### Tests for calculateRates
test("computes gamma and epsilon rate arrays", () => {
  const [onesCount, zerosCount] = [
    [7, 5, 8, 7, 5],
    [5, 7, 4, 5, 7],
  ];
  const [gamma, epsilon] = [
    [1, 0, 1, 1, 0],
    [0, 1, 0, 0, 1],
  ];
  expect(calculateRates([onesCount, zerosCount])).toStrictEqual([
    gamma,
    epsilon,
  ]);
});

test("return null if lengths isn't equal or empty", () => {
  expect(calculateRates([[], [1, 2]])).toBeNull();
  expect(calculateRates([[1], [2, 3]])).toBeNull();
});

//##### Tests for binaryArrayToDecimal

test("converts binary array to decimal", () => {
  expect(binaryArrayToDecimal([1, 0, 1, 1, 0])).toBe(22);
  expect(binaryArrayToDecimal([0, 1, 0, 1, 0])).toBe(10);
});

//##### Tests for resolvePartOne

test("calculates results to part one from bits advent of code example", () => {
  expect(resolvePartOne(adventOfCodeExampleBits)).toBe(198);
});

//##### Tests for calculateOxygenCO2Rating

test("calculate oxygen rating", () => {
  const result = [0, 1, 0, 1, 0];
  expect(
    calculateOxygenCO2Rating(adventOfCodeExampleBits, false)
  ).toStrictEqual(result);
});

//##### Tests for resolvePartTwo

test("calculates results to part one from bits advent of code example", () => {
  expect(resolvePartTwo(adventOfCodeExampleBits)).toBe(230);
});
