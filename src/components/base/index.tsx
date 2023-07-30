import Element from "./element";

type Props = (props: any) => any;

export const allComponents: any = {};
export const allDirectives: any = {};
export let Base: any = null;

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
    props = props || {};
    const isText = typeof tag === "string" ? true : false;
    if ((isText && tag === "x-slot") || props["x-html"]) {
      // Based Built || Customized HTML
      let xTag: string = "";
      if (tag === "x-slot") {
        xTag = tag.substring(2);
      } else {
        xTag = tag;
      }
      return preact.h(
        Base,
        { "x-tag": xTag === "slot" ? null : xTag, ...props },
        ...children
      );
    } else if (isText && tag.startsWith("x-") && tag !== "x-slot") {
      // Based Built || Customized HTML
      const xTag = tag.substring(2);
      const replacementComponent = allComponents[xTag];
      if (replacementComponent) {
        return preact.h(replacementComponent, props, ...children);
      }
      return preact.h(xTag, props, ...children);
    }
    return preact.h(tag, props, ...children);
  }
}

const App = new VirtualApp();

export default App;