import Base from "./element";

function toKebabCase(str: string): string {
  return str.toLowerCase().replace(/[^a-z-]/g, "");
}

export { default as Base } from "./element";

export const allComponents: Record<string, any> = {};
export const allDirectives: Record<string, any> = {};
export const allProps: Record<string, any> = {};
export const allStates: Record<string, any> = {};

export function globalProps(props: Record<string, any> = {}) {
  Object.keys(props).forEach((key) => {
    allProps[key] = props[key];
  });
}

export function globalStore(props: Record<string, any> = {}) {
  Object.keys(props).forEach((key) => {
    allStates[key] = props[key];
  });
}

export function element(name: string) {
  const namespace = toKebabCase(name);
  return (component: any) => {
    allComponents[namespace] = component;
    return component;
  };
}

export function directive(name: string) {
  const namespace = toKebabCase(name);
  return (method: any) => {
    allDirectives[namespace] = method;
    return method;
  };
}

export function h(
  tag: string,
  props?: Record<string, any>,
  ...children: any[]
): any {
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

export default {};
