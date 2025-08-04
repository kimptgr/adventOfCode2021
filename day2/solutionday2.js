import { readLinesFromFile } from "../utils/readLinesFromFile.js";

/**
 * Read an text file and translates each line into a movement command
 * @param {string} filePath relative path to the text file input
 * @returns {[string, Number][]} Array of [direction, value] tuples.
 */
function parseCommands(filePath) {
  const lines = readLinesFromFile(filePath);
  return lines.map((line) => {
    const [direction, value] = line.split(" ");
    return [direction, Number(value)];
  });
}

/**
 * Follow instructions to return final coordinates.
 * @param {[string, Number][]} Array of [direction, value] tuples.
 * @returns {{ x: number, y: number }} Final horizontal and depth positions.
 */
function followCommands(commands) {
  let x = 0,
    y = 0;
  commands.forEach(([direction, value]) => {
    switch (direction) {
      case "forward":
        x += value;
        break;
      case "down":
        y += value;
        break;
      case "up":
        y -= value;
        break;
    }
  });
  return { x, y };
}

/**
 * Resolve part one of the problem Advent of Code Day 2.
 * @returns {string} Result message.
 */
export function resolvePartOne() {
  const comands = parseCommands("day2/input.txt");
  const { x, y } = followCommands(comands);
  const result = x * y;
  const message = `The result of the final depth * final horizontal position = ${result}`;
  console.log(message);
  return message;
}

resolvePartOne();
