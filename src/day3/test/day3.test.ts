import { assertEquals } from "@std/assert/equals";
import { findPattern, multiplyAll } from "../day3.ts";

const file = await Deno.readTextFile("src/day3/test/input3.test.txt");

Deno.test("should replace all invalid characters", () => {
  assertEquals(findPattern(file), [
    "mul(2,4)",
    "mul(5,5)",
    "mul(11,8)",
    "mul(8,5)",
  ]);
});

Deno.test("should return sum of all multiplications", () => {
  assertEquals(
    multiplyAll(["mul(2,4)", "mul(5,5)", "mul(11,8)", "mul(8,5)"]),
    161
  );
});
