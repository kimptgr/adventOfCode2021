import {
  parseCommands,
  followCommands,
  resolve,
} from "../day2/solutionDay2.js";
import { readLinesFromFile } from "../utils/readLinesFromFile.js";

const adventOfCodeExamplePath = "test/testInputDay2.txt";
const adventOfCodeExampleCommands = parseCommands(
  readLinesFromFile(adventOfCodeExamplePath)
);

//##### Tests for parseCommands

test("returns [] when lines are empty or invalid", () => {
  expect(parseCommands()).toStrictEqual([]);
  expect(parseCommands([])).toStrictEqual([]);
  const input = [
    "forward 5",
    "down banana",
    "left 3", // invalid direction
    "up", // missing value
    "forward -3", // (accepté ici, à toi de décider)
    "forward 2 more", // trop d'arguments
  ];

  expect(parseCommands(input)).toStrictEqual([
    ["forward", 5],
    ["forward", -3], // si tu acceptes les négatifs
  ]);
});

test("returns direction and value from Advent of Code Example", () => {
  const result = [
    ["forward", 5],
    ["down", 5],
    ["forward", 8],
    ["up", 3],
    ["down", 8],
    ["forward", 2],
  ];
  expect(
    parseCommands(readLinesFromFile(adventOfCodeExamplePath))
  ).toStrictEqual(result);
});

//##### Tests for followCommands

test("returns 0,0 for empty commands or invalid commands", () => {
  expect(followCommands([])).toStrictEqual({ x: 0, y: 0 });
  expect(followCommands(null)).toStrictEqual({ x: 0, y: 0 });
  expect(followCommands(undefined)).toStrictEqual({ x: 0, y: 0 });
  expect(followCommands("not an array")).toStrictEqual({ x: 0, y: 0 });
});

test("returns 15,10 with advent of code example part 1", () => {
  expect(followCommands(adventOfCodeExampleCommands, false)).toEqual({
    x: 15,
    y: 10,
  });
});

test("returns 15,10 with advent of code example part 2", () => {
  expect(followCommands(adventOfCodeExampleCommands, true)).toEqual({
    x: 15,
    y: 60,
  });
});

test("ignores unknown commands and invalid values", () => {
  const commands = [
    ["forward", 5],
    [("forward", NaN)],
    ["forward", "2"],
    ["forward", true],
    ["back", 42],
    ["down", 2],
  ];
  expect(followCommands(commands, false)).toStrictEqual({
    x: 5,
    y: 2,
  });
});

test("command with value 0 has no effect", () => {
  const commands = [
    ["forward", 0],
    ["down", 0],
    ["up", 0],
  ];
  const position = followCommands(commands, false);
  expect(position).toEqual({ x: 0, y: 0 });
});

test("ignores malformed commands", () => {
  const commands = [
    ["forward", 5],
    42,
    ["forward"],
    ["forward", 2, 1],
    ["back", 42],
    ["down", 2],
  ];
  expect(followCommands(commands, false)).toStrictEqual({
    x: 5,
    y: 2,
  });
});

//##### Tests for resolve

test("returns correct result for part one advent of code example", () => {
  expect(resolve(false, adventOfCodeExampleCommands)).toBe(150);
});

test("returns correct result for part two advent of code example", () => {
  expect(resolve(true, adventOfCodeExampleCommands)).toBe(900);
});

test("resolve ignores invalid commands and values", () => {
  const commands = [
    ["forward", 5],
    ["fly", 42],
    ["down", NaN],
    ["forward", "string"],
  ];
  expect(resolve(false, commands)).toBe(0);
});

test("resolve with empty command list returns result input", () => {
  expect(resolve(false, [])).toBe(0);
  expect(resolve(true, [])).toBe(0);
});
