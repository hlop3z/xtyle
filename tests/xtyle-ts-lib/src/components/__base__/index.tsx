import "./style.scss";
import Props from "./props.ts";

export default function Component(props: Props = {}) {
  const className: string = "icon";
  return (
    <div x-html {...props} class={[className, props.class]}>
      {props.children}
    </div>
  );
}
