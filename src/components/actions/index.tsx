function actionCore(root): any {
  return (key) =>
    key.split(".").reduce((o, i) => {
      if (o) return o[i];
    }, root);
}

export default function actions(root) {
  const admin: any = actionCore(root);
  return (name: string, args: any): any => {
    const method = admin(name);
    if (method) {
      return method(args);
    } else {
      console.error(`Method { ${name} } Not Found`);
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
