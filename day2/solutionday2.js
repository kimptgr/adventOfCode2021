"use-strict";
import { readLinesFromFile } from "../utils/readLinesFromFile.js";

/**
 * Read a text file and translates each line into a movement command
 * @param {string} filePath relative path to the text file input
 * @returns {[string, Number][]} Array of [direction, value] tuples.
 */
export function parseCommands(filePath) {
  const lines = readLinesFromFile(filePath);
  return lines.map((line) => {
    const [direction, value] = line.split(" ");
    return [direction, Number(value)];
  });
}

/**
 * Follow instructions to return final coordinates.
 * @param {[string, Number][]} commands Array of [direction, value] tuples.
 * @param {bool} readManualSkill True if manuel is reading
 * @returns {{ x: number, y: number }} Final horizontal and depth positions.
 */
export function followCommands(commands, readManualSkill) {
  let x = 0,
    y = 0,
    aim = 0;
  commands.forEach(([direction, value]) => {
    switch (direction) {
      case "forward":
        x += value;
        if (readManualSkill) y += aim * value;
        break;
      case "down":
        readManualSkill ? (aim += value) : (y += value);
        break;
      case "up":
        readManualSkill ? (aim -= value) : (y -= value);
        break;
    }
  });
  return { x, y };
}

/**
 * Resolve part one of the problem Advent of Code Day 2.
 * @returns {string} Result message.
 */
export function resolve(readManualSkill) {
  const commands = parseCommands("day2/input.txt");
  const { x, y } = followCommands(commands, readManualSkill);
  const result = x * y;
  const message = `The result of the final depth * final horizontal position ${
    readManualSkill ? "after" : "without"
  } reading manual = ${result}`;
  console.log(message);
  return message;
}

resolve(false);
resolve(true);
