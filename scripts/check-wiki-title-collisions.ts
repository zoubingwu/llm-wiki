import { findTitleCollisions } from "../src/lib/wiki/registry.ts";

const collisions = findTitleCollisions(process.cwd());

if (collisions.length === 0) {
  console.log("No normalized title collisions found.");
  process.exit(0);
}

console.error("Normalized title collisions found:\n");

for (const collision of collisions) {
  console.error(`- ${collision.collection}: ${collision.normalizedTitle}`);
  for (const entry of collision.entries) {
    console.error(`  - ${entry.path}`);
  }
  console.error("");
}

process.exit(1);
