// replaceLastChar.js
import fs from "fs";

export function replaceLastChar(filePath, newChar) {
  fs.promises
    .readFile(filePath, "utf8")
    .then((data) => {
      if (data.length === 0) {
        console.error("The file is empty.");
        return;
      }

      const updatedData = data.trim().slice(0, -1) + newChar;

      fs.promises
        .writeFile(filePath, updatedData, "utf8")
        .then(() => {
          console.log("Last character replaced successfully.");
        })
        .catch((error) => {
          console.error("Error writing to the file:", error);
        });
    })
    .catch((error) => {
      console.error("Error reading the file:", error);
    });
}

// Usage example:
const filePath = "dist/index.min.js";
const newChar = ".default;"; // Replace this with the character you want to use

replaceLastChar(filePath, newChar);
