import { readFileSync } from "fs";

const packageJsonContent = readFileSync("./package.json", "utf-8");
const packageJson = JSON.parse(packageJsonContent);
const packageName = packageJson.name;

export default packageName;
