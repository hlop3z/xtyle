import fs from "fs";
import { execSync } from "child_process";
import ProjectName from "./__init__.mjs";

const sourceCSS = "dist/style.css";
const destinationCSS = `dist/${ProjectName}.min.css`;

try {
  fs.copyFileSync(sourceCSS, destinationCSS);
} catch (error) {
  console.error("Error executing command:", error.message);
}

try {
  const result = execSync(
    "rm dist/index.js dist/index.min.js dist/style.css dist/vite.svg"
  );
  console.log(result.toString());
} catch (error) {
  console.error("Error executing command:", error.message);
}
