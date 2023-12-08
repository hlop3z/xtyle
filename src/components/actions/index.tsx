function actionCore(options, group: string | null | undefined = undefined) {
  const groupName = group ? group + ":" : "";
  return (name: string, args: any): any => {
    if (options[name]) {
      return options[name](args);
    } else {
      console.error(`Method { ${groupName}${name} } Not Found`);
    }
  };
}

function actionGroup(root) {
  const adminAPI = {};
  Object.entries(root).forEach(([group, options]) => {
    adminAPI[group] = actionCore(options, group);
  });
  return (actionURI: string, args: any): any => {
    const [action, group] = actionURI.split(":");
    if (adminAPI[group]) {
      return adminAPI[group](action, args);
    } else {
      console.error(`Action Group { ${group} } Not Found`);
    }
  };
}

export default function actions(options, groups: boolean = false) {
  return groups ? actionGroup(options) : actionCore(options);
}
