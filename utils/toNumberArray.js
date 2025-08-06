/**
 * Convert a mixed array of strings or numbers into a number array
 * @param {Array<string | number>} array
 * @returns {number[]}
 */
export function toNumberArray(array) {
  if (!Array.isArray(array)) return [];
  return array
    .filter((item) => typeof item === "string" || typeof item === "number")
    .map(Number)
    .filter((number) => !isNaN(number));
}
