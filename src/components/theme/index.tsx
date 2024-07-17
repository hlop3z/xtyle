import { injectCSS } from "../util";

class ThemeCreator {
  theme: any;
  light: any;
  dark: any;
  disable: any;
  zebra: string | boolean;

  constructor({ theme, light = {}, dark = {}, disable = [], zebra = true }) {
    this.theme = theme;
    this.light = light;
    this.dark = dark;
    this.disable = disable;
    this.zebra = zebra ? "#f2f2f2" : false;
  }

  createTheme() {
    const cssCode = this.generateThemeColors();
    injectCSS(cssCode, "theme-colors");
    return cssCode;
  }

  generateThemeColors() {
    let css = "";
    const isDisable = (value) => this.disable.includes(value);

    // Default Table Color (ODDS)
    if (this.zebra) css += this.colorDefaultTableZebra(this.zebra);

    // Generate Theme Colors
    Object.entries(this.theme).forEach(([name, color]) => {
      // Check for light and dark variants
      const lightVariant = this.light[name];
      const darkVariant = this.dark[name];

      const buildColor = (group) =>
        this.buildColorStyles(group, name, color, lightVariant, darkVariant);

      const addColorGroup = (group) => {
        if (!isDisable(group)) css += buildColor(group);
      };

      addColorGroup("background");
      addColorGroup("text");
      addColorGroup("border");
      addColorGroup("table");
    });

    return css;
  }

  buildColorStyles(group, name, color, lightVariant, darkVariant) {
    const method = Color[group];
    let css = "";
    css += method(name, color);
    if (lightVariant) css += method(`${name}-light`, lightVariant);
    if (darkVariant) css += method(`${name}-dark`, darkVariant);
    return css;
  }

  colorDefaultTableZebra(color) {
    return `tbody tr:nth-child(even) { background-color: ${color}; }\n`;
  }
}

const ColorBase = {
  background: (color) => `background-color: ${color} !important;`,
  border: (color) => `border-color: ${color} !important;`,
  text: (color) => `color: ${color} !important;`,
  table: (color) =>
    `tbody tr:nth-child(even) { background-color: ${color} !important; }\n`,
};

const generateStyle = (group, name, color) => {
  if (group === "table") {
    return `.${getClass(name, group)} ${ColorBase[group](color)}\n`;
  } else {
    return `.${getClass(name, group)} { ${ColorBase[group](color)} }\n`;
  }
};

const Color = {
  background: (name, color) => generateStyle("background", name, color),
  border: (name, color) => generateStyle("border", name, color),
  text: (name, color) => generateStyle("text", name, color),
  table: (name, color) => generateStyle("table", name, color),
};

// @ts-ignore
let currentTheme = new ThemeCreator({});

function createTheme(args) {
  const current = new ThemeCreator(args);
  current.createTheme();
  currentTheme = current;
}

function getClass(type, name) {
  const util = {
    background: (name) => `color-bg-${name}`,
    border: (name) => `color-br-${name}`,
    text: (name) => `color-tx-${name}`,
    table: (name) => `color-tb-${name}`,
  };
  return util[type](name);
}

export default {
  set: createTheme,
  class: getClass,
  get info() {
    return currentTheme;
  },
};
