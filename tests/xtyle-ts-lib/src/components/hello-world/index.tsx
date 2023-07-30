import "./style.scss";
import Props from "./props.ts";

export default function Component(props: Props) {
  // <xtyle.base x-show={false} />;
  return (
    <div {...props} x-html on-click={() => console.log("hello world")} x-demo>
      Hello World
    </div>
  );
}
