import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const base = path.join(__dirname, "..");
const htmlPath = path.join(base, "index.html");
const outDir = path.join(base, "assets", "css");
const outPath = path.join(outDir, "site.css");

const t = fs.readFileSync(htmlPath, "utf8");
const m = t.match(/<style>([\s\S]*?)<\/style>/);
if (!m) throw new Error("no <style> in index.html");
fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(outPath, m[1].trim(), "utf8");
console.log("Wrote", outPath, m[1].trim().length, "chars");
