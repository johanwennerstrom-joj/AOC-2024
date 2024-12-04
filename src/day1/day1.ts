import { announceDayResult, getInput } from "../utils/utils.ts";
import { Pairs } from "./types.ts";

export function formatLists(
  input: string,
  options: { sort?: boolean } = { sort: false }
) {
  const { leftList, rightList } = input
    .split("\n")
    .reduce<{ leftList: number[]; rightList: number[] }>(
      ({ leftList, rightList }, current) => {
        const [left, right] = current.split(/\u0020{3}/);

        return {
          leftList: [...leftList, parseInt(left)],
          rightList: [...rightList, parseInt(right)],
        };
      },
      { leftList: [], rightList: [] }
    );

  if (options.sort) {
    return {
      left: leftList.toSorted(),
      right: rightList.toSorted(),
    };
  } else {
    return {
      left: leftList,
      right: rightList,
    };
  }
}

export function pairNumbers(left: number[], right: number[]) {
  const pairs: Pairs = [];

  for (let i = left.length - 1; i >= 0; i--) {
    pairs.push([left[i], right[i]]);
  }

  return pairs;
}

export function calculatePairDistance(pairs: Pairs) {
  const totalSum = pairs.reduce((accumulator, [left, right]) => {
    if (left > right) {
      accumulator += left - right;
    } else if (right > left) {
      accumulator += right - left;
    }
    return accumulator;
  }, 0);

  return totalSum;
}

export function getInstancesOfNumbers(arr: number[]) {
  const sorted = arr.toSorted();

  const numberInstances = sorted.reduce<{ [key: number]: number }>(
    (accumulator, currentValue) => {
      if (accumulator[currentValue] === undefined) {
        accumulator[currentValue] = 1;
      } else {
        accumulator[currentValue]++;
      }
      return accumulator;
    },
    {}
  );

  return numberInstances;
}

export function calculateSimilarityScore(list: number[], toCompare: number[]) {
  const rightNumberInstances = getInstancesOfNumbers(toCompare);

  const similarity = list.reduce((accumulator, current) => {
    if (current in rightNumberInstances) {
      accumulator += current * rightNumberInstances[current];
    }
    return accumulator;
  }, 0);

  return similarity;
}

export async function day1() {
  const input = await getInput("src/day1/input1.txt");

  const { left, right } = formatLists(input, { sort: true });

  const pairs = pairNumbers(left, right);

  const sum = calculatePairDistance(pairs);

  const similarityScore = calculateSimilarityScore(left, right);

  announceDayResult({
    day: "day1",
    part1: {
      text: "Sum is: ",
      result: sum,
    },
    part2: {
      text: "Similarity",
      result: similarityScore,
    },
  });
}
