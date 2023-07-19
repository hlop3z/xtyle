import "./style.scss";
import Props from "./props.ts";

export default function Component(props: Props) {
  return (
    <xtyle.element x-tag="div" {...props} class={[props.class]}>
      {props.children}
    </xtyle.element>
  );
}
