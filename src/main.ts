import { day1 } from "./day1/day1.ts";
import { parseArgs } from "@std/cli/parse-args";
import { day2 } from "./day2/day2.ts";
import { day3 } from "./day3/day3.ts";

const AOC2024 = {
  day1,
  day2,
  day3,
};

const args = parseArgs(Deno.args);

if (import.meta.main) {
  if (args.all) {
    Object.keys(AOC2024).forEach(async (day) => {
      await AOC2024[day as keyof typeof AOC2024]();
    });
  } else if (!args.all && "day" in args) {
    if (args.day in AOC2024) {
      try {
        await AOC2024[args.day as keyof typeof AOC2024]();
      } catch (_) {
        console.error("Failed to find a day with the name " + args.day);
      }
    } else {
      console.error(
        args.day +
          " Does not seem to exist. Please try one of the existing days:",
        ...Object.keys(AOC2024).map((key) => key)
      );
    }
  }
}
