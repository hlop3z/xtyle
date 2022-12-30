# Xtyle

CSS in JS

## Install

```sh
npm install xtyle
```

## Usage

```js
import xtyle from "xtyle";

/* HTML & CSS */
/**
 * @param {string} id: UniqueID
 * @param {string} code: codeString
 **/

/* JavaScript */
/**
 * @param {string} id: UniqueID
 * @param {string} src: source
 **/

xtyle("app-one", "* { margin: 0; padding: 0; }");

xtyle.css({
  id: "main-style",
  code: "* { background-color: pink }",
});

xtyle.js({
  id: "main-script",
  src: "/first.js",
});

xtyle.html({
  id: "single-via-ID",
  code: "My Application",
});

xtyle.html({
  // Dynamic (No - ID)
  code: "<div>Add as Many as you Need.<div>",
});
```
