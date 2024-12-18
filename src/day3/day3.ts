import { announceDayResult, getInput } from "../utils/utils.ts";

const file = await getInput("src/day3/input3.txt");

const pattern = /mul\([0-9]+,[0-9]+\)/gi;

export function extractMulPattern(mul: string) {
  const numbers = mul.match(/[0-9]+,[0-9]+/i)?.at(0);
  return numbers?.split(",");
}

export function multiplyPattern(pattern: string) {
  const formatted = extractMulPattern(pattern);
  return (
    (formatted?.[0] ? parseInt(formatted[0]) : 0) *
    (formatted?.[1] ? parseInt(formatted[1]) : 0)
  );
}

export function findPattern(input: string) {
  return Array.from(
    input.matchAll(pattern).map(([val]) => {
      return val;
    })
  );
}

export function multiplyAll(multiplications: string[]) {
  const sum = multiplications.reduce((accumulator, current) => {
    accumulator += multiplyPattern(current);
    return accumulator;
  }, 0);
  return sum;
}

export function day3() {
  const values = findPattern(file);

  const totalSum = multiplyAll(values);

  announceDayResult({
    day: "day3",
    part1: {
      text: "Result of all multiplications: ",
      result: totalSum,
    },
  });
}
