"use-strict";

import { readLinesFromFile } from "../utils/readLinesFromFile.js";

/**
 * Reads a file and parses each line into an array of bits
 * @param {string} filePath relative path to the input file
 * @returns {number[][]} Array of bits
 */
export function parseBinaryFile(filePath) {
  const lines = readLinesFromFile(filePath);
  return lines.map((line) => {
    return line.split("").map(Number);
  });
}
/**
 * Count every bit by position
 * @param {number[][]} bytes 2D array of bits
 * @returns  {[number[], number[]]} Arrays of counts: [onesCount, zerosCount]
 */
export function countBytesPerPosition(bytes) {
  let onesCount = Array(bytes[0].length).fill(0);
  let zerosCount = Array(bytes[0].length).fill(0);

  bytes.forEach((line) => {
    line.forEach((bit, index) => {
      bit ? onesCount[index]++ : zerosCount[index]++;
    });
  });

  return [onesCount, zerosCount];
}

/**
 * Compare the counts of 0 and 1 to build gamma and epsilon array
 * @param {[number[], number[]]} counts [onesCount, zerosCount]
 * @returns {[number[], number[]]} [gammaRateArray, epsilonRateArray]
 */
export function calculateRates([onesCount, zerosCount]) {
  if (onesCount.length === 0 || onesCount.length != zerosCount.length)
    return null;

  return [
    onesCount.map((count, index) => Number(count > zerosCount[index])),
    onesCount.map((count, index) => Number(count < zerosCount[index])),
  ];
}

/**
 * Converts a binary array into a decimal number
 * @param {number[]} arrayBase2 Binary digits as an array
 * @returns {number} Decimal equivalent
 */
export function binaryArrayToDecimal(arrayBase2) {
  return parseInt(arrayBase2.join(""), 2);
}

/**
 * Runs part one of the Day 3 puzzle: computes the submarine's power consumption
 * @param {string} inputPath Path to input file
 * @returns {string} Message describing the result
 */
export function resolvePartOne(inputPath) {
  const bytes = parseBinaryFile(inputPath);
  const [onesCount, zerosCount] = countBytesPerPosition(bytes);
  const [gammaRateArray, epsilonRateArray] = calculateRates([
    onesCount,
    zerosCount,
  ]);
  const gammaRate = binaryArrayToDecimal(gammaRateArray);
  const epsilonRate = binaryArrayToDecimal(epsilonRateArray);
  const consumption = gammaRate * epsilonRate;

  const message = `The power of consumption of the submarine is ${consumption}`;
  console.log(message);
  return message;
}

resolvePartOne("day3/input.txt");
//resolvePartOne("test/testinputday3.txt");
