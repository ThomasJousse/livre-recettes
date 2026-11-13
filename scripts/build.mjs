// Génère www/config.js à partir des variables d'environnement (secrets GitHub en CI) ou de config.local.json
import fs from "node:fs";
const pkg = JSON.parse(fs.readFileSync("package.json", "utf8"));
let local = {};
try { local = JSON.parse(fs.readFileSync("config.local.json", "utf8")); } catch {}
const cfg = {
  api: process.env.RECETTES_API_URL || local.api || "",
  key: process.env.RECETTES_API_KEY || local.key || "",
  sheet: process.env.RECETTES_SHEET_URL || local.sheet || "",
  repo: process.env.GITHUB_REPOSITORY || local.repo || "",
  version: (process.env.APP_VERSION || pkg.version).replace(/^v/, ""),
};
fs.writeFileSync("www/config.js", "window.APP_CONFIG=" + JSON.stringify(cfg) + ";\n");
console.log("config.js →", { ...cfg, key: cfg.key ? "***" : "(vide)" });
