terminal("#terminal-index", [
  { type: "input", value: "cd xtyle-ts-template/" },
  { type: "input", value: "npm install" },
  { type: "input", value: "npm run dev" },
]);

terminal("#terminal-getting-started", [
  { type: "input", value: "pdm init" },
  { value: "0. C:\\Python311\\python.EXE (3.11)", startDelay: 0 },
  {
    value: "1. C:\\Users\\Me\\etc...\\python3.10.exe (3.10)",
    startDelay: 0,
  },
  {
    value: "2. C:\\Users\\Me\\etc...\\python3.7.exe (3.7)",
    startDelay: 0,
  },
  { type: "input", typeDelay: 1000, prompt: "Please select (0):", value: "1" },
  {
    value: " ",
    startDelay: 0,
  },
  {
    value: "Using Python interpreter: C:\\etc...\\python3.10.exe (3.10)",
    startDelay: 0,
  },
  {
    type: "input",
    typeDelay: 1000,
    prompt: "Would you like to create a virtualenv ... [y/n] (y):",
    value: "y",
  },
  {
    value: "Virtualenv is created successfully at C:\\etc...",
    startDelay: 0,
  },
]);
