"use strict";

import { readLinesFromFile } from "../utils/readLinesFromFile.js";

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
  const lines = readLinesFromFile("day1/input.txt");
  const count = countIncreased(lines);
  const message = `Number of measurements larger than the previous one: ${count}`;
  console.log(message);

  return message;
}

/**
 * Create an Array with sums of a three-measurement sliding window
 * @param {string[]|Number[]} depths Array representing numeric depths.
 * @returns {Number[]} Array representing the sums of a three-measurement sliding window
 */
export function getSlidingWindowsSums(depths) {
  const sizeOfWindow = 3;
  let sum = 0;
  let slidingWindow = [];
  let sumOfMeasurements = [];

  for (let i = 0; i < depths.length; i++) {
    const depth = Number(depths[i]);
    slidingWindow.push(depth);
    sum += depth;

    if (slidingWindow.length === sizeOfWindow) sumOfMeasurements.push(sum);
    if (slidingWindow.length >= sizeOfWindow) {
      sum -= slidingWindow[0];
      slidingWindow.shift();
    }
  }
  return sumOfMeasurements;
}

/**
 * Resolve part two of the problem Advent of Code Day 1 by counting increases in the input file.
 * @returns {string} Result message.
 */
export function resolvePartTwo() {
  const lines = readLinesFromFile("day1/input.txt");
  const measurements = getSlidingWindowsSums(lines);
  const count = countIncreased(measurements);
  const message = `Number of sums in a three-measurement sliding window larger than the previous one: ${count}`;
  console.log(message);

  return message;
}

resolvePartOne();
resolvePartTwo();
