import fs from "fs";

const textToAppend = `window.h=xtyle.h;`;

function appendText() {
  fs.appendFile("dist/index.min.js", textToAppend, (err) => {
    if (err) {
      console.error("Error appending to file:", err);
    }
  });
}

appendText();
