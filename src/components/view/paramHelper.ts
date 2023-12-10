type PatternParameter = { [param: string]: boolean };

function extractParameters(pattern: string): PatternParameter {
  const params: PatternParameter = {};

  // Regular expression to match parameters inside {}
  const regex = /\{([^{}]+)\}/g;

  let match;
  while ((match = regex.exec(pattern)) !== null) {
    //@ts-ignore
    const [fullMatch, param] = match;
    const isOptional = param.includes("?");
    const isWildcard = param.includes("*");

    // Remove ? or * from the param to get the actual parameter name
    const paramName = param.replace(/[^a-zA-Z0-9]/g, "");

    // Add to the params dictionary
    params[paramName] = !(isOptional || isWildcard);
  }

  return params;
}

/*
const patternDemo = "/a/b/key-{name}/{?key}/{path*}";
const parameterDict = extractParameters(patternDemo);
console.log(parameterDict);
*/

function replaceKeys(pattern, keyValues) {
  return pattern.replace(/\{([^{}]+)\}/g, (_, key) => {
    // Check if the key exists in the dictionary
    key = key.replace(/\*/g, "").replace(/\?/g, "");
    if (keyValues.hasOwnProperty(key)) {
      return keyValues[key];
    }
    // If the key is not found, leave it unchanged
    return `{${key}}`;
  });
}

export default {
  extract: extractParameters,
  build: replaceKeys,
};
