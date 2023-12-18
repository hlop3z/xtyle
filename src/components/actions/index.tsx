function actionCore(root): any {
  return (key) =>
    key.split(".").reduce((o, i) => {
      if (o) return o[i];
    }, root);
}

export function flattenActions(obj, path = "") {
  let result: any = [];
  for (const key in obj) {
    const newPath = path ? `${path}.${key}` : key;
    if (typeof obj[key] === "function") {
      result.push(newPath);
    } else if (typeof obj[key] === "object" && obj[key] !== null) {
      result = result.concat(flattenActions(obj[key], newPath));
    } else {
      result.push(newPath);
    }
  }
  return result;
}

export default function actions(root) {
  const admin: any = actionCore(root);
  return (name: string, args: any): any => {
    const method = admin(name);
    if (method) {
      return method(args);
    } else {
      const errorMessage = `Method { ${name} } Not Found`;
      throw new Error(errorMessage);
    }
  };
}

/*
const action: any = actions({
  app: {
    model: {
      method() {
        console.log("Hello from <app.model.method>");
      },
    },
  },
});

action("app.model.method");
action("namespace.not.found");

*/
