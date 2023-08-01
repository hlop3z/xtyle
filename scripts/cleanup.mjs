import { execSync } from "child_process";

try {
  const result = execSync(
    "rm dist/index.js dist/vite.svg dist/preact.min.js dist/xtyle.min.js"
  );
  console.log(result.toString());
} catch (error) {
  console.error("Error executing command:", error.message);
}
