import { Logger } from "jsr:@deno-library/logger";

export async function getInput(path: string) {
  return await Deno.readTextFile(path);
}

interface Part {
  text: string;
  result: string | number;
}
interface AnnounceDayResultParams {
  day: string;
  part1: Part;
  part2?: Part;
}

const logger = new Logger();

export function announceDayResult({
  day,
  part1,
  part2,
}: AnnounceDayResultParams) {
  logger.info({ [day]: { part1, part2 } });
}
