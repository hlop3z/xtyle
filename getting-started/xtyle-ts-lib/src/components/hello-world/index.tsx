import "./style.scss";
import Props from "./props.ts";

export default function Component(props: Props) {
  return (
    <xtyle.element x-tag="div" {...props} class={[props.class, "hello-world"]}>
      <h4>{props.title}</h4>
      {props.children}
    </xtyle.element>
  );
}
