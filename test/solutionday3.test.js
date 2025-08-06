import {
  parseBinaryLines,
  countBitsPerPosition,
  calculateRates,
  binaryArrayToDecimal,
  calculateOxygenCO2Rating,
} from "../solutionDay3.js";
import { readLinesFromFile } from "../utils/readLinesFromFile.js";

const adventOfCodeExamplePath = "test/testInputDay3.txt";
const adventOfCodeExampleLines = readLinesFromFile(adventOfCodeExamplePath);
const adventOfCodeExampleCommands = parseCommands(adventOfCodeExampleLines);

//##### Tests for parseBinaryLines
