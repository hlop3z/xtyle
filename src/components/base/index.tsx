import Element from "./element";

type Props = (props: any) => any;

export let Base: any = null;
export const allComponents: any = {};
export const allDirectives: any = {};
export const allProps: any = {};
export const allStates: any = {};

class VirtualApp {
  base: any;

  constructor() {
    Base = Element(this);
  }

  private toKebabCase(str: string): string {
    return str.toLowerCase().replace(/[^a-z-]/g, "");
  }
  get components() {
    return allComponents;
  }
  get directives() {
    return allDirectives;
  }

  globalProps(props: any = {}) {
    Object.keys(props).forEach((key) => {
      allProps[key] = props[key];
    });
  }
  globalStore(props: any = {}) {
    Object.keys(props).forEach((key) => {
      allStates[key] = props[key];
    });
  }
  // Decorator-like function to register a component under a given path
  element(name: string) {
    const namespace = this.toKebabCase(name);
    return (component: Props) => {
      allComponents[namespace] = component;
      return component;
    };
  }
  directive(name: string) {
    const namespace = this.toKebabCase(name);
    return (method: Props) => {
      allDirectives[namespace] = method;
      return method;
    };
  }

  h(tag: string, props: any, ...children: any[]): any {
    let $props = props || {};
    const isText = typeof tag === "string" ? true : false;

    // Built From (Base) || Customized HTML
    if ((isText && tag === "x-slot") || $props["x-html"]) {
      const xTag: string | null = tag === "x-slot" ? null : tag;
      return preact.h(Base, { "x-tag": xTag, ...$props }, ...children);
    }
    // Built From (Base) || Customized HTML
    else if (isText && tag.startsWith("x-") && tag !== "x-slot") {
      const xTag = tag.substring(2);
      const replacementComponent = allComponents[xTag];
      if (replacementComponent) {
        return preact.h(replacementComponent, $props, ...children);
      }
      return preact.h(Base, { "x-tag": xTag, ...$props }, ...children);
    }
    // Regular Preact
    return preact.h(tag, props, ...children);
  }
}

const App = new VirtualApp();

export default App;
