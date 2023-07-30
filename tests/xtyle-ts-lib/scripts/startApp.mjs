import fs from "fs";
import { join } from "path";
import { execSync } from "child_process";

export function copyFolderSync(sourceFolder, destinationFolder) {
  if (!fs.existsSync(destinationFolder)) {
    fs.mkdirSync(destinationFolder);
  }

  const files = fs.readdirSync(sourceFolder);

  files.forEach((file) => {
    const sourcePath = join(sourceFolder, file);
    const destinationPath = join(destinationFolder, file);

    if (fs.lstatSync(sourcePath).isDirectory()) {
      copyFolderSync(sourcePath, destinationPath);
    } else {
      fs.copyFileSync(sourcePath, destinationPath);
    }
  });
}

// Source (Folder)
const sourceFolder = "src/components/__base__";
const destinationFolder = "src/components/" + process.argv[2].toLowerCase();

copyFolderSync(sourceFolder, destinationFolder);

try {
  const result = execSync("npm run app:collect"); // Replace 'ls -la' with your desired command
} catch (error) {
  console.error("Error executing command:", error.message);
}
