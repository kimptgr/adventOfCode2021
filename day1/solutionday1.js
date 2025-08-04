"use strict";

import { readFileSync } from "fs";

/**
 * Reads a text file and returns an array of lines
 *
 * @param {string} inputPath Relative path to the input file.
 * @returns {string[]} Array of lines from the file.
 */
function readLinesFromFile(inputPath) {
  try {
    const input = readFileSync(new URL(inputPath, import.meta.url), "utf-8");
    return input.trim().split("\r?\n");
  } catch (error) {
    console.error(`Error reading file ${inputPath}: `, error);
    return [];
  }
}

/**
 * Counts how many times a number in the array is strictly greater than the previous number.
 * @param {string|Number[]} depths Array representing numeric depths.
 * @returns {number} Count of increases
 */
export function countIncreased(depths) {
  let previousDepth = null;
  let count = 0;
  depths.forEach((depthString) => {
    const depth = Number(depthString);
    if (previousDepth != null && depth > previousDepth) count++;
    previousDepth = depth;
  });
  return count;
}

/**
 * Resolve part one of the problem Advent of Code Day 1 by counting increases in the input file.
 * @returns {string} Result message.
 */
export function resolvePartOne() {
  const lines = readLinesFromFile("input.txt");
  const count = countIncreased(lines);
  const message = `Number of measurements larger than the previous one: ${count}`;
  console.log(message);

  return message;
}

resolvePartOne();
