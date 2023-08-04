import { readdir, stat, readFile, writeFile } from "fs/promises";
import fs from "fs";
import path from "path";
import ProjectName from "./__init__.mjs";

const folderPath = "src/components"; // Search Path
const outPath = "dist";
const isCore = true;

const SPECIAL = [
  "global",
  "store",
  "router",
  "signal",
  "useSignal",
  "device",
  "model",
  "validator",
  "stringTo",
];

const titleCase = (text) => {
  if (isCore) return text;
};

function createParentPath(filePath) {
  const parentDir = path.dirname(filePath);

  if (!fs.existsSync(parentDir)) {
    try {
      fs.mkdirSync(parentDir, { recursive: true });
    } catch (error) {
      console.error("Error creating parent path:", error);
    }
  }
}

async function collectTSXFiles() {
  const listFunc = [];
  const listComp = [];
  async function decorator(folderPath, currentFolder = "") {
    try {
      const files = await readdir(folderPath);

      for (const file of files) {
        const filePath = path.join(folderPath, file);
        const fileStats = await stat(filePath);

        if (fileStats.isDirectory()) {
          const subFolderPath = path.join(currentFolder, file);
          await decorator(filePath, subFolderPath); // Recursively call for subfolder
        } else if (file === "props.ts") {
          const docContent = await readFile(
            path.join(folderPath, "docs.ts"),
            "utf-8"
          );
          const fileContent = await readFile(filePath, "utf-8");
          const folderName = path.basename(currentFolder);
          const componentName = titleCase(folderName);

          // Use the file {Content} and {Folder-Name}
          if (folderName !== "__base__") {
            let outFunc = null;
            const propsCode = fileContent.split("export default Props;")[0];
            const outType = propsCode
              .replace("type Props =", "")
              .trim()
              .slice(0, -1);
            // Builder
            if (SPECIAL.includes(componentName)) {
              outFunc = `${componentName}: ${outType}`;
            } else {
              outFunc = `${componentName}: (props: ${outType}) => object;`;
            }
            listFunc.push(docContent + "\n\n" + outFunc);
            listComp.push(
              `export { default as ${componentName} } from "./${folderName}/index.tsx";`
            );
          }
        }
      }
      //console.log(listFunc.join("\n"));
    } catch (error) {
      console.error("Error reading folder:", error);
    }
  }

  await decorator(folderPath);

  const code = {
    // Files
    comps_file: path.join(folderPath, "index.ts"),
    types_file: path.join(outPath, `${ProjectName}.d.ts`),
    // Text
    types: listFunc.join("\n\n"),
    comps: listComp.join("\n"),
  };

  createParentPath(code.types_file);
  await writeFile(code.comps_file, code.comps, "utf-8");
  await writeFile(
    code.types_file,
    `declare const ${ProjectName}:{\n${code.types}\n};`,
    "utf-8"
  );
}

collectTSXFiles();
