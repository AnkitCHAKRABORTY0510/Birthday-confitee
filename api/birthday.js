import { readFile } from "fs/promises";
import path from "path";

export default async function handler(req, res) {
  // Replace with your birthday
  const BIRTHDAY_MONTH = 10; // September (0 = January)
  const BIRTHDAY_DAY = 5;

  const today = new Date();
  const day = today.getDate();
  const month = today.getMonth() + 1; // JS months are 0-indexed

  let filePath;

  if (day === BIRTHDAY_DAY && month === BIRTHDAY_MONTH) {
    filePath = path.join(process.cwd(), "public", "index.html");
  } else {
    filePath = path.join(process.cwd(), "public", "404.html");
  }

  const file = await readFile(filePath, "utf-8");
  res.setHeader("Content-Type", "text/html");
  res.status(200).send(file);
}
