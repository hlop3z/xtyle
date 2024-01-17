import { readdir, stat, readFile, writeFile } from "fs/promises";
import fs from "fs";
import path from "path";

import ProjectName from "./__init__.mjs";

const folderPath = "src/components"; // Search Path
const outPath = "dist";

const titleCase = (text) => {
  if (text === "createRouter") return "Router";
  return text;
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
  const listDocs = [];
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
            let outDocs = null;
            const propsCode = fileContent.split("export default Props;")[0];
            const outType = propsCode
              .replace("type Props =", "")
              .trim()
              .slice(0, -1);
            // Builder
            if (componentName === "base") {
              outFunc = `${componentName}: (props: ${outType}) => any;`;
              outDocs = `declare const ${componentName}: (props: ${outType}) => any;`;
            } else {
              outFunc = `${componentName}: ${outType}`;
              outDocs = `declare const ${componentName}: ${outType}`;
            }
            listDocs.push(docContent + "\n\n" + outDocs);
            listFunc.push(docContent + "\n\n" + outFunc);
            listComp.push(
              `export { default as ${componentName} } from "./${folderName}/index.tsx";`
            );
          }
        }
      }
    } catch (error) {
      console.error("Error reading folder:", error);
    }
  }

  await decorator(folderPath);

  const code = {
    // Files
    comps_file: path.join(folderPath, "index.ts"),
    types_file: path.join(outPath, `${ProjectName}.d.ts`),
    // docs_file: path.join(outPath, `types.d.ts`),
    // Text
    docs: listDocs.join("\n\n"),
    types: listFunc.join("\n\n"),
    comps: listComp.join("\n"),
  };

  createParentPath(code.types_file);

  const xtyleDocumentation = `declare const ${ProjectName}:{\n${code.types}\n};`;

  await writeFile(code.comps_file, code.comps, "utf-8");
  await writeFile(code.types_file, xtyleDocumentation, "utf-8");
  //await writeFile(code.docs_file, code.docs, "utf-8");
}

collectTSXFiles();
