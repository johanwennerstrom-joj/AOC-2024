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

export function announceDayResult({
  day,
  part1,
  part2,
}: AnnounceDayResultParams) {
  console.log(
    `Results for ${day}: \n ⭐: ${part1.text} ${part1.result} \n ⭐⭐: ${
      part2?.text ?? "Not done"
    } ${part2?.result ?? ""}`
  );
}
