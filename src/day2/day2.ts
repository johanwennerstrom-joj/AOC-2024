import { announceDayResult, getInput } from "../utils/utils.ts";

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

  for (let i = 1; i < levels.length; i++) {
    const prev = levels[i - 1];
    const current = levels[i];

    if (!validDiff(prev, current)) {
      allowedDiff = false;
    }
    if (prev === current) {
      notMoved = true;
    }
    if (prev > current) isDecreasing = true;
    if (prev < current) isIncreasing = true;
  }

  if ((isDecreasing && isIncreasing) || notMoved || !allowedDiff) {
    return false;
  }

  return isDecreasing || isIncreasing;
}

export function validReportWithRemoval(levels: number[]): boolean {
  for (let i = 0; i < levels.length; i++) {
    const newLevels = levels.slice(0, i).concat(levels.slice(i + 1));
    if (validReport(newLevels)) {
      return true;
    }
  }
  return false;
}

function levelToInt(levels: string[]) {
  return levels.map((level) => parseInt(level));
}

export function calculateValidReports(reports: string[]) {
  return reports.reduce<{ base: number; withDampener: number }>(
    ({ base, withDampener }, report) => {
      const levels = levelToInt(report.split(" "));

      if (validReport(levels)) {
        base += 1;
      } else if (validReportWithRemoval(levels)) {
        withDampener += 1;
      }

      return {
        base,
        withDampener,
      };
    },
    { base: 0, withDampener: 0 }
  );
}

export async function day2() {
  const file = await getInput("src/day2/input2.txt");
  const reports = file.split("\n");
  const validReports = calculateValidReports(reports);

  announceDayResult({
    day: "day2",
    part1: {
      text: "Number of valid reports: ",
      result: validReports.base,
    },
    part2: {
      text: "Number of valid reports with the Problem Dampener: ",
      result: validReports.base + validReports.withDampener,
    },
  });
}
