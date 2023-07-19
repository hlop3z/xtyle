import fs from "fs";
import { join } from "path";
import { execSync } from "child_process";

function copyFolderSync(sourceFolder, destinationFolder) {
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

// Usage example:
const sourceFolder = "src/components/__base__";
const destinationFolder = "src/components/" + process.argv[2];

copyFolderSync(sourceFolder, destinationFolder);

try {
  // Run the command and store the output in a variable
  const result = execSync("npm run app:collect"); // Replace 'ls -la' with your desired command

  // Convert the buffer to a string and log the output
  console.log(result.toString());
} catch (error) {
  // Handle any errors that occurred during command execution
  console.error("Error executing command:", error.message);
}
