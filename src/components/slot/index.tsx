import Props from "../props";

function Slots(props, name, component) {
  const method = component ? component : name;
  let namespace = component ? name : null;
  if (!namespace) namespace = method.name || null;
  const propsAdmin: any = Props(props);
  propsAdmin.name = namespace;
  propsAdmin.render = (parentProps, data) => {
    const context: any = propsAdmin.props(data || {});
    context.$root = parentProps;
    return method(context);
  };
  return propsAdmin;
}

export default Slots;
