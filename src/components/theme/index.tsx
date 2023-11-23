import { injectCSS } from "../../utils";

export default function createTheme({ theme, light, dark }) {
  const cssCode = themeColors({ theme, light, dark });
  injectCSS(cssCode, "theme-colors");
  // @ts-ignore
  this.config = { theme, light, dark };
  return cssCode;
}

const bgColor = (color) => `background-color: ${color} !important;`;
const brColor = (color) => `border-color: ${color} !important;`;
const txColor = (color) => `color: ${color} !important;`;
const colorDefaultTableZebra = (color) =>
  `tbody tr:nth-child(odd) { background-color: ${color}; }`;

const Color = {
  background: (name, color) => `.color-bg-${name} { ${bgColor(color)} }\n`,
  border: (name, color) => `.color-br-${name} { ${brColor(color)} }\n`,
  text: (name, color) => `.color-tx-${name} { ${txColor(color)} }\n`,
  table: (name, color) =>
    `.color-tb-${name} tbody tr:nth-child(even) { background-color: ${color}; }`,
  build(group, { name, color, lightVariant, darkVariant }) {
    let css = "";
    const method = this[group];
    css += method(name, color);
    if (lightVariant) css += method(`${name}-light`, lightVariant);
    if (darkVariant) css += method(`${name}-dark`, darkVariant);
    return css;
  },
};

function themeColors({ theme, light, dark }) {
  // INIT
  let css = "";
  light = light || {};
  dark = dark || {};

  // Default Table Color (ODDS)
  colorDefaultTableZebra("#ffffff");

  // Generate Theme Colors
  Object.entries(theme).forEach(([name, color]) => {
    // Check for light and dark variants
    const lightVariant = light[name];
    const darkVariant = dark[name];

    const builder = (group) =>
      Color.build(group, {
        name,
        color,
        lightVariant,
        darkVariant,
      });

    // Background
    css += builder("background");

    // Text
    css += builder("text");

    // Border
    css += builder("border");

    // Table
    css += builder("table");
  });

  return css;
}
