import Base from "./element";

type Props = (props: any) => any;

class VirtualApp {
  base: any;
  private directives: any;
  private component: any;

  constructor() {
    this.base = Base(this);
    this.component = {};
    this.directives = {};
  }

  private toKebabCase(str: string): string {
    return str.toLowerCase().replace(/[^a-z-]/g, "");
  }

  // Decorator-like function to register a component under a given path
  element(name: string) {
    const namespace = this.toKebabCase(name);
    return (component: Props) => {
      this.component[namespace] = component;
      return component;
    };
  }
  directive(name: string, method: any) {
    const namespace = this.toKebabCase(name);
    this.directives[namespace] = method;
    return method;
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
        this.base,
        { "x-tag": xTag === "slot" ? null : xTag, ...props },
        ...children
      );
    } else if (isText && tag.startsWith("x-") && tag !== "x-slot") {
      // Based Built || Customized HTML
      const xTag = tag.substring(2);
      const replacementComponent = this.component[xTag];
      if (replacementComponent) {
        return preact.h(replacementComponent, props, ...children);
      }
      return preact.h(xTag, props, ...children);
    }
    return preact.h(tag, props, ...children);
  }
}

const App = new VirtualApp();

export default {
  $core: App,
  // @ts-ignore
  h: (...args: any) => App.h(...args),
  // @ts-ignore
  element: (...args: any) => App.element(...args),
  // @ts-ignore
  directive: (...args: any) => App.directive(...args),
};
