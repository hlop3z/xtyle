import PropsSchemaBuilder from "../props";
import { camelProps } from "../util";

function Slots(props, name, component) {
  const method = component ? component : name;
  let namespace = component ? name : null;
  if (!namespace) namespace = method.name || null;
  const propsAdmin: any = PropsSchemaBuilder(props); // Custom
  propsAdmin.name = namespace;
  propsAdmin.render = (parentProps, data) => {
    const context: any = camelProps(propsAdmin.props(data || {}));
    context.$root = parentProps;
    return method(context);
  };
  return propsAdmin;
}

export default Slots;
