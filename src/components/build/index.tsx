// Components in Pascal-Case to Kebab-Case
function pascalToKebab(str: string) {
  return str
    .replace(/([a-z0-9])([A-Z])/g, "$1-$2") // Convert uppercase letters to kebab-case
    .toLowerCase(); // Convert the whole string to lowercase
}

// Build Components
function getComponentsOnly(self, ignore: any = null) {
  const components = {};
  const excluded = ignore || [];
  Object.keys(self).forEach((key) => {
    if (!["install", ...excluded].includes(key)) {
      components[key] = self[key];
    }
  });
  return components;
}

function baseBuildComponents(
  options: any = {},
  title: string | undefined = undefined
) {
  const dict = {};
  Object.keys(options).forEach((key) => {
    const name = (title ? `${title}-` : "") + pascalToKebab(key);
    dict[name] = options[key];
  });
  return dict;
}

export default function buildComponents(
  self: any = {},
  title: string | undefined = undefined,
  ignore: string | undefined = undefined
) {
  const components = getComponentsOnly(self, ignore);
  return baseBuildComponents(components, title);
}
