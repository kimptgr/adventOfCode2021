import { readLinesFromFile } from "../utils/readLinesFromFile.js";

test("returns [] when file is empty", () => {
  expect(readLinesFromFile("test/testInputEmpty.txt")).toStrictEqual([]);
});

test("returns [] when path is empty or file doesn't exist", () => {
  expect(readLinesFromFile()).toStrictEqual([]);
});

test("returns array of strings from a valid input file", () => {
  expect(readLinesFromFile("test/testInputDay1.txt")).toStrictEqual([
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
  ]);
});
