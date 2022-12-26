import fs from "fs/promises";

export default async function writeToFile(
  outputLocation: string,
  input: string
): Promise<void> | never {
  try {
    fs.writeFile(outputLocation, input);
  } catch (err) {
    throw err;
  }
}
