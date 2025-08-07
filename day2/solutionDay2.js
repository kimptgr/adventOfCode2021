import { readLinesFromFile } from "../utils/readLinesFromFile.js";

/**
 * Read an array of lines and translates each line into a movement command
 * @param {string[]} lines Array of strings
 * @returns {[string, Number][]} Array of [direction, value]
 */
export function parseCommands(lines) {
  if (!Array.isArray(lines)) return [];
  return lines
    .map((line) => {
      const parts = line.trim().split(" ");
      if (parts.length !== 2) return null;
      const [command, valueStr] = parts;
      const value = Number(valueStr);
      if (!["forward", "up", "down"].includes(command)) return null;
      if (isNaN(value)) return null;
      return [command, value];
    })
    .filter((cmd) => cmd !== null);
}

/**
 * Follow instructions to return final coordinates
 * @param {[string, Number][]} commands Array of [direction, value]
 * @param {bool} readManualSkill True if manuel is reading
 * @returns {{ x: number, y: number }} Final horizontal and depth positions
 */
export function followCommands(commands, readManualSkill) {
  if (!Array.isArray(commands) || commands.length === 0) return { x: 0, y: 0 };
  let x = 0,
    y = 0,
    aim = 0;

  for (let command of commands) {
    if (!Array.isArray(command) || command.length != 2) continue;

    const [direction, value] = command;

    if (typeof value !== "number" || isNaN(value)) continue;

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
  }
  return { x, y };
}

/**
 * Resolves part 1 or part 2 of the problem Advent of Code Day 2 depending on whetherthe manual was read
 *
 * @param {boolean} readManualSkill Whether to apply the manual's interpretation
 * @param {Array<[string, number]>} [injectedCommands] - Optional array of commands to override the file input
 * @returns {number} The product of final horizontal position and depth
 */
export function resolve(readManualSkill = false, injectedCommands) {
  const commands = Array.isArray(injectedCommands)
    ? injectedCommands
    : parseCommands(readLinesFromFile("day2/input.txt"));
  const { x, y } = followCommands(commands, readManualSkill);
  const result = x * y;
  const message = `Final position (depth * horizontal) ${
    readManualSkill ? "after reading" : "without"
  } manual: ${result}`;
  console.log(message);
  return result;
}

if (import.meta.main) {
  resolve(false);
  resolve(true);
}
