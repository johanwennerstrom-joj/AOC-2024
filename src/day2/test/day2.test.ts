import { assertEquals } from "@std/assert/equals";
import { calculateValidReports, validReport } from "../day2.ts";

const file = await Deno.readTextFile("src/day2/test/input2.test.txt");

Deno.test("calculateValidReports", () => {
  assertEquals(calculateValidReports(file.split("\n")), 2);
});

Deno.test("validReport asserts true", () => {
  assertEquals(validReport([7, 6, 4, 2, 1]), true);
});

Deno.test("validReport asserts false", () => {
  assertEquals(validReport([1, 2, 7, 8, 9]), false);
});
