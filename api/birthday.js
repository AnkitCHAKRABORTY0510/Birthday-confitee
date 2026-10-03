import { readFile } from "fs/promises";
import path from "path";

export default async function handler(req, res) {
  // Replace with your birthday
  const BIRTHDAY_MONTH = 10; // October (1 = January)
  const BIRTHDAY_DAY = 5;
  // Vercel servers run on UTC, so check the date where she lives
  const TIME_ZONE = "Asia/Kolkata";

  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: TIME_ZONE,
    day: "numeric",
    month: "numeric",
  }).formatToParts(new Date());
  const day = Number(parts.find((part) => part.type === "day").value);
  const month = Number(parts.find((part) => part.type === "month").value);

  let filePath;

  if (day === BIRTHDAY_DAY && month === BIRTHDAY_MONTH) {
    filePath = path.join(process.cwd(), "public", "index.html");
  } else {
    filePath = path.join(process.cwd(), "public", "404.html");
  }

  const file = await readFile(filePath, "utf-8");
  res.setHeader("Content-Type", "text/html");
  // never cache, so the page switches exactly at midnight
  res.setHeader("Cache-Control", "no-store");
  res.status(200).send(file);
}
