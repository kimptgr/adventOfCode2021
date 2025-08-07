import { readLinesFromFile } from "../utils/readLinesFromFile.js";

export const INPUT_PATH = "day3/input.txt";

/**
 * Converts binary string lines to arrays of 0s and 1s
 * @param {string[]} lines
 * @returns {number[][]} Array of bits
 */
export function parseBinaryLines(lines) {
  return lines
    .filter((line) => typeof line === "string" && /^[01]+$/.test(line))
    .map((line) => {
      return line.split("").map(Number);
    });
}
/**
 * Count every bit by position
 * @param {number[][]} bits 2D array of bits
 * @param {number} index position where bit should be counted
 * @returns  {[number[], number[]]} Arrays of counts: [onesCount, zerosCount]
 */
export function countBitsPerPosition(bits, index) {
  if (!Array.isArray(bits) || bits.length < 1) return [[], []];
  if (index === undefined) {
    const onesCount = Array(bits[0].length).fill(0);
    const zerosCount = Array(bits[0].length).fill(0);

    bits.forEach((line) => {
      line.forEach((bit, i) => {
        bit ? onesCount[i]++ : zerosCount[i]++;
      });
    });

    return [onesCount, zerosCount];
  } else {
    let onesCount = 0;
    let zerosCount = 0;

    bits.forEach((line) => {
      if (index < line.length) {
        line[index] ? onesCount++ : zerosCount++;
      }
    });

    return [onesCount, zerosCount];
  }
}

/**
 * Compare the counts of 0 and 1 to build gamma and epsilon array
 * @param {[number[], number[]]} counts [onesCount, zerosCount]
 * @returns {[number[], number[]]} [gammaRateArray, epsilonRateArray]
 */
export function calculateRates([onesCount, zerosCount]) {
  if (onesCount.length === 0 || onesCount.length != zerosCount.length)
    return [[], []];

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
  if (!Array.isArray(arrayBase2) || arrayBase2.length === 0) return 0;
  return parseInt(arrayBase2.join(""), 2);
}

/**
 * Solve part one of the Day 3 puzzle: computes the submarine's power consumption
 * @param {number[][]} [injectedBits] Optional pre-parsed bits to use instead of reading file
 * @returns {number} Calculated power consumption
 */
export function resolvePartOne(injectedBits) {
  const bits = injectedBits ?? parseBinaryLines(readLinesFromFile(INPUT_PATH));
  const [onesCount, zerosCount] = countBitsPerPosition(bits);
  const [gammaRateArray, epsilonRateArray] = calculateRates([
    onesCount,
    zerosCount,
  ]);
  const gammaRate = binaryArrayToDecimal(gammaRateArray);
  const epsilonRate = binaryArrayToDecimal(epsilonRateArray);
  const consumption = gammaRate * epsilonRate;

  const message = `Submarine power consumption: ${consumption}`;
  console.log(message);
  return consumption;
}

/**
 * Calculates oxygen generator rating and C02 scrubber rating
 * @param {number[][]} bits Array of bit
 * @param {boolean} preferMostCommon Choose bit to keep (true for oxygen rating, false to CO2 rating)
 * @returns {number[]} The remaining binary number after filtering
 */
export function calculateOxygenCO2Rating(bits, preferMostCommon) {
  if (!Array.isArray(bits) || bits.length < 1) return [];
  const length = bits[0].length;

  for (let i = 0; i < length; i++) {
    const [onesCount, zerosCount] = countBitsPerPosition(bits, i);
    if (bits.length === 1) return bits[0];
    onesCount >= zerosCount
      ? (bits = bits.filter((bit) => bit[i] === Number(preferMostCommon)))
      : (bits = bits.filter((bit) => bit[i] === Number(!preferMostCommon)));
  }
  return bits[0];
}

/**
 * Solve part two of the Day 3 puzzle: calculates the life support rating
 * @param {number[][]} [injectedBits] Optional pre-parsed bits to use instead of reading file
 * @returns {number} oxygen rating multiplied by co2 rating
 */
export function resolvePartTwo(injectedBits) {
  const bits = injectedBits ?? parseBinaryLines(readLinesFromFile(INPUT_PATH));
  const oxygenRatingInBase2 = calculateOxygenCO2Rating(bits, true);
  const oxygenRatingDecimal = binaryArrayToDecimal(oxygenRatingInBase2);
  const C02RatingInBase2 = calculateOxygenCO2Rating(bits, false);
  const C02RatingDecimal = binaryArrayToDecimal(C02RatingInBase2);
  const lifeSupportRating = oxygenRatingDecimal * C02RatingDecimal;
  const message = `Submarine life support rating: ${lifeSupportRating}`;
  console.log(message);
  return lifeSupportRating;
}

if (import.meta.main) {
  const bits = parseBinaryLines(readLinesFromFile(INPUT_PATH));
  resolvePartOne(bits);
  resolvePartTwo(bits);
}
