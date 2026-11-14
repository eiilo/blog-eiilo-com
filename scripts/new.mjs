#!/usr/bin/env node
// Start a new blog post:
//
//   npm run new "Title of the post"
//
// It writes a Markdown file with today's date and prints its path.

import { existsSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join, relative } from "node:path";

const title = process.argv.slice(2).join(" ").trim();
if (!title) {
  console.error('Usage: npm run new "Title of the post"');
  process.exit(1);
}

const slug = title
  .normalize("NFKD")
  .replace(/[\u0300-\u036f]/g, "")
  .toLowerCase()
  .replace(/[^a-z0-9]+/g, "-")
  .replace(/^-+|-+$/g, "");

if (!slug) {
  console.error("The title needs at least one letter or digit.");
  process.exit(1);
}

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const file = join(root, "src", "content", "blog", `${slug}.md`);

if (existsSync(file)) {
  console.error(`${relative(root, file)} already exists. Pick another title, or edit that file.`);
  process.exit(1);
}

const now = new Date();
const today = [now.getFullYear(), now.getMonth() + 1, now.getDate()]
  .map((n) => String(n).padStart(2, "0"))
  .join("-");

writeFileSync(
  file,
  ["---", `title: ${JSON.stringify(title)}`, `date: ${today}`, 'description: ""', "draft: true", "---", "", "Write here.", ""].join("\n"),
);
console.log(`Created ${relative(root, file)}`);
console.log(`It will be at /${slug}/. Remove "draft: true" to publish it.`);
