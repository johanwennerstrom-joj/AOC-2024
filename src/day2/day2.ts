import { announceDayResult, getInput } from "../utils/utils.ts";

// Any two adjacent levels differ by at least one and at most three.

function levelToInt(levels: string[]) {
  return levels.map((level) => parseInt(level));
}

function validDiff(num: number, toCompare: number) {
  if (num > toCompare) {
    return num - toCompare >= 1 && num - toCompare <= 3;
  }
  if (num < toCompare) {
    return toCompare - num >= 1 && toCompare - num <= 3;
  }
  return false;
}

export function validReport(levels: number[]) {
  let isDecreasing = false;
  let isIncreasing = false;
  let allowedDiff = true;
  let notMoved = false;
  let problemCount = 0;

  for (let i = 1; i < levels.length; i++) {
    const prev = levels[i - 1];
    const current = levels[i];

    if (!validDiff(prev, current)) {
      allowedDiff = false;
      problemCount += 1;
    }
    if (prev === current) {
      notMoved = true;
      problemCount += 1;
    }
    if (prev > current) isDecreasing = true;
    if (prev < current) isIncreasing = true;
  }

  const neither = isDecreasing && isIncreasing;
  if (!allowedDiff) return false;
  if (neither || notMoved) {
    problemCount += 1;
    return false;
  }

  return isDecreasing || isIncreasing;
}

export function calculateValidReports(reports: string[]) {
  return reports.reduce((accumulator, report) => {
    if (validReport(levelToInt(report.split(" ")))) {
      accumulator += 1;
    }
    return accumulator;
  }, 0);
}

export async function day2() {
  const file = await getInput("src/day2/input2.txt");
  const validReports = calculateValidReports(file.split("\n"));

  const validDampenedReports = calculateValidReports(file.split("\n"));

  announceDayResult({
    day: "day1",
    part1: {
      text: "Number of valid reports: ",
      result: validReports,
    },
  });
}
