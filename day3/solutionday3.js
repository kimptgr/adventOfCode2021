import { readLinesFromFile } from "../utils/readLinesFromFile.js";

/**
 * Converts binary string lines to arrays of 0s and 1s
 * @param {string[]} lines
 * @returns {number[][]} Array of bits
 */
export function parseBinaryLines(lines) {
  return lines
    .filter((line) => /^[01]+$/.test(line))
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
 * Solve part one of the Day 3 puzzle: computes the submarine's power consumption
 * @param {string} inputPath Path to input file
 * @returns {number} Calcul of power comnsuption
 */
export function resolvePartOne(inputPath) {
  const bits = parseBinaryLines(readLinesFromFile(inputPath));
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
 * Calculates oxygen genarator rating and C02 scrubber rating
 * @param {number[][]} bits Array of bit
 * @param {boolean} preferMostCommon Choose bit to keep (true for oxygen rating, false to c02 rating)
 * @returns {number[]} The final number (into an array of bits)
 */
export function calculateOxygenCO2Rating(bits, preferMostCommon) {
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
 * @param {string} inputPath Path to input file
 * @returns {number} oxygen rating multiplied by co2 rating
 */
export function resolvePartTwo(inputPath) {
  const bits = parseBinaryLines(readLinesFromFile(inputPath));
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
  resolvePartOne("day3/input.txt");
  resolvePartTwo("day3/input.txt");
}
