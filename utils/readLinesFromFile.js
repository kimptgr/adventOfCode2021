"use strict";

import { readFileSync } from "fs";

/**
 * Reads a text file and returns an array of lines
 *
 * @param {string} inputPath Relative path to the input file.
 * @returns {string[]} Array of lines from the file.
 */
export function readLinesFromFile(inputPath) {
  try {
    const input = readFileSync(inputPath, "utf-8");
    return input.trim().split(/\r?\n/);
  } catch (error) {
    console.error(`Error reading file ${inputPath}: `, error);
    return [];
  }
}
