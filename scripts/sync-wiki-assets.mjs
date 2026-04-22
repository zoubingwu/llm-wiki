import { cpSync, existsSync, mkdirSync, rmSync } from "node:fs";

const sourceDir = "raw/assets";
const targetDir = "public/assets/wiki";

mkdirSync(targetDir, { recursive: true });
if (existsSync(targetDir)) rmSync(targetDir, { recursive: true, force: true });
mkdirSync(targetDir, { recursive: true });
cpSync(sourceDir, targetDir, { recursive: true });
console.log(`synced assets to ${targetDir}`);
