import { toNumberArray } from "../utils/toNumberArray.js";

test("returns an empty array when input is an empty array", () => {
  expect(toNumberArray([])).toStrictEqual([]);
});

test("returns an empty array when input is undefined", () => {
  expect(toNumberArray(undefined)).toStrictEqual([]);
});

test("returns an empty array when input is null", () => {
  expect(toNumberArray(null)).toStrictEqual([]);
});

test("filters out non-numeric values", () => {
  const input = ["42", "abc", null, undefined, "7.5", 0, {}, [], "NaN"];
  const expected = [42, 7.5, 0];
  expect(toNumberArray(input)).toStrictEqual(expected);
});

test("converts strings and numbers to numbers", () => {
  const input = ["10", 20, "30.5"];
  const expected = [10, 20, 30.5];
  expect(toNumberArray(input)).toStrictEqual(expected);
});

test("returns correct numbers when all entries are valid", () => {
  const input = ["1", "2", "3", 4];
  const expected = [1, 2, 3, 4];
  expect(toNumberArray(input)).toStrictEqual(expected);
});

test("handles negative numbers and floats", () => {
  const input = ["-5", "-3.14", 0, "0.001"];
  const expected = [-5, -3.14, 0, 0.001];
  expect(toNumberArray(input)).toStrictEqual(expected);
});
