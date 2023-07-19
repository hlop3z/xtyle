import fs from "fs";
import { execSync } from "child_process";

// Source (Folder)
const sourceCSS = "dist/style.css";
const destinationCSS = "dist/theme.min.css";

fs.copyFileSync(sourceCSS, destinationCSS);

try {
  const result = execSync("rm dist/index.js dist/style.css dist/vite.svg");
  console.log(result.toString());
} catch (error) {
  console.error("Error executing command:", error.message);
}
