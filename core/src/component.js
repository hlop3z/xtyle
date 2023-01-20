import core from "./virtual-dom.js";
import reactive from "./reactive.js";

/* @ Component  
--------------------
*/

const checkTypeName = {
  [String]: "String",
  [Number]: "Number",
  [Function]: "Function",
  [Array]: "Array",
  [null]: "NULL",
  [Object]: "Object",
  [undefined]: "UNDEFINED",
};

const checkType = (value) => {
  if (typeof value === "string") {
    return { name: checkTypeName[String], type: String };
  } else if (typeof value === "number") {
    return { name: checkTypeName[Number], type: Number };
  } else if (typeof value === "function") {
    return { name: checkTypeName[Function], type: Function };
  } else if (typeof value === "object") {
    if (Array.isArray(value)) {
      return { name: checkTypeName[Array], type: Array };
    } else if (value === null) {
      return { name: checkTypeName[null], type: null };
    } else {
      return { name: checkTypeName[Object], type: Object };
    }
  } else {
    return { name: checkTypeName[Function], type: undefined };
  }
};

function createProps(component, inputObject) {
  const componentObject = {};
  const propsKeys = Object.keys(component.props);
  const cdataKeys = Object.keys(component.data);
  propsKeys.forEach((item) => {
    let value = inputObject[item];
    const expectedType = checkTypeName[component.props[item].type];
    if (value) {
      const inputType = checkType(value);
      const isValid = component.props[item].type === inputType.type;
      if (!isValid) {
        if (["Function", "Object", "Array"].includes(expectedType)) {
          value = component.props[item].default();
        } else {
          value = component.props[item].default;
        }
        console.error(
          `prop: { ${item} } is not of the value { ${expectedType} }`
        );
      }
    } else {
      if (["Function", "Object", "Array"].includes(expectedType)) {
        value = component.props[item].default();
      } else {
        value = component.props[item].default;
      }
    }
    componentObject[item] = value;
  });
  // Bind Functions To Object
  const elementProps = Object.assign(
    {},
    { ...component.data, ...componentObject }
  );
  elementProps.__keys__ = Array.from(new Set([...cdataKeys, ...propsKeys]));
  return elementProps;
}

function Component(options) {
  const element = {
    props: options.props || {},
    data: options.data || {},
    methods: options.methods || {},
    mounted: options.mounted || function () {},
    unmounted: options.unmounted || function () {},
    view: options.view || function () {},
    components: options.components || {},
  };
  function methodBind(vnode) {
    Object.keys(element.methods).forEach((item) => {
      const method = element.methods[item];
      vnode[item] = method.bind(vnode);
    });
    vnode.__view__ = element.view.bind(vnode);
    vnode.__mounted__ = element.mounted.bind(vnode);
    vnode.__unmounted__ = element.unmounted.bind(vnode);
    return vnode;
  }
  // Create
  const elementProps = {};
  elementProps.__bind__ = methodBind;
  elementProps.__props__ = (props) => createProps(element, props);
  return elementProps;
}

function reactiveComponent(component) {
  // Component
  const componentCustom = Component(component);

  // Config
  const propsCustom = reactive(componentCustom.__props__({}));
  componentCustom.__bind__(propsCustom);
  const propsPlayground = Object.assign({}, propsCustom);

  // HyperScript
  const finalHyperScript = core.h(propsPlayground.__view__());

  // Virtual-DOM
  const vdomFinal = core.vdom(finalHyperScript);

  // Config Merge with Virtual-DOM
  propsPlayground.$el = vdomFinal.$el;
  propsPlayground.____dict____.__redraw__ = () => vdomFinal.redraw();

  // Config & Return
  vdomFinal.$view = () => core.vdom(core.h(propsPlayground.__view__()));
  vdomFinal.$dict = {
    set: (key, value) => propsCustom.$set(key, value),
    get: (key) => propsCustom.$get(key),
  };
  return vdomFinal;
}

export default reactiveComponent;
