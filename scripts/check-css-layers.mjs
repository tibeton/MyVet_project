// Guards the cascade-layer order in app/globals.css.
//
// Astryx and Tailwind both ship cascade layers, and the order between them is
// load-bearing in two opposite directions:
//   - Astryx BELOW Tailwind's `base`  -> preflight's `button { background: transparent }`
//     strips Astryx button fills (submit button renders invisible).
//   - Astryx ABOVE Tailwind's `utilities` -> Astryx's :where(h1..h6) rules beat
//     font-extrabold/font-bold, flattening headings site-wide.
// Both failures are silent — the build passes and only the pixels are wrong —
// so this check fails the build instead.

import { readFileSync } from "node:fs";

const FILE = "app/globals.css";
const src = readFileSync(new URL(`../${FILE}`, import.meta.url), "utf8");

const match = src.match(/@layer\s+([^;]+);/);
if (!match) {
  console.error(
    `\n✗ ${FILE}: missing the "@layer ...;" statement.\n` +
      `  Astryx button fills and site-wide heading weights both depend on it.\n`,
  );
  process.exit(1);
}

const layers = match[1].split(",").map((s) => s.trim());
const at = (name) => layers.indexOf(name);
const required = ["base", "astryx-base", "utilities"];

const missing = required.filter((n) => at(n) === -1);
if (missing.length) {
  console.error(
    `\n✗ ${FILE}: @layer statement is missing: ${missing.join(", ")}\n` +
      `  Found: ${layers.join(", ")}\n`,
  );
  process.exit(1);
}

if (!(at("base") < at("astryx-base") && at("astryx-base") < at("utilities"))) {
  console.error(
    `\n✗ ${FILE}: wrong @layer order.\n` +
      `  Need: base < astryx-base < utilities\n` +
      `  Found: ${layers.join(", ")}\n` +
      `  base before astryx-base  -> Astryx buttons lose their background.\n` +
      `  astryx-base before utilities -> headings lose font-extrabold/font-bold.\n`,
  );
  process.exit(1);
}

console.log("✓ CSS cascade-layer order OK (base < astryx-base < utilities)");
