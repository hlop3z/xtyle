import "./style.scss";
import Props from "./props.ts";

export default function Component(props: Props = {}) {
  const className: string = "icon";
  return (
    <xtyle.element x-tag="div" {...props} class={[className, props.class]}>
      {props.children}
    </xtyle.element>
  );
}
