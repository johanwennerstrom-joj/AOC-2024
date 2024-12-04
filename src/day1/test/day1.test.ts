import {
  calculatePairDistance,
  formatLists,
  pairNumbers,
  calculateSimilarityScore,
  getInstancesOfNumbers,
} from "../day1.ts";
import { assertEquals } from "jsr:@std/assert";

const file = await Deno.readTextFile("src/day1/test/input1.test.txt");

const { left, right } = formatLists(file);

Deno.test("getInstancesOfNumber", () => {
  const instances = getInstancesOfNumbers(right);
  assertEquals(instances, { "3": 3, "4": 1, "5": 1, "9": 1 });
});

Deno.test("calculateSimilarityScore", () => {
  const similarity = calculateSimilarityScore(left, right);

  assertEquals(similarity, 31);
});

Deno.test("formatLists", () => {
  const { left, right } = formatLists(file, { sort: true });

  assertEquals(left, [1, 2, 3, 3, 3, 4]);
  assertEquals(right, [3, 3, 3, 4, 5, 9]);
});

Deno.test("pairNumbers", () => {
  assertEquals(pairNumbers([1, 2, 3, 3, 3, 4], [3, 3, 3, 4, 5, 9]), [
    [4, 9],
    [3, 5],
    [3, 4],
    [3, 3],
    [2, 3],
    [1, 3],
  ]);
});

Deno.test("calculatePairDistance", () => {
  assertEquals(
    calculatePairDistance([
      [4, 9],
      [3, 5],
      [3, 4],
      [3, 3],
      [2, 3],
      [1, 3],
    ]),
    11
  );
});
