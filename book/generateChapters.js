import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const chaptersDir = path.join(__dirname, "chapters");
const outputPath = path.join(chaptersDir, "chapters.json");

function generateChaptersFile() {
  const files = fs
    .readdirSync(chaptersDir, { withFileTypes: true })
    .filter((entry) => entry.isFile() && entry.name.toLowerCase().endsWith(".md"))
    .map((entry) => entry.name)
    .sort((a, b) => a.localeCompare(b));

  fs.writeFileSync(outputPath, JSON.stringify(files, null, 2) + "\n", "utf8");
  console.log(`Generated chapters.json with ${files.length} chapter(s).`);
}

generateChaptersFile();
