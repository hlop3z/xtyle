import HelloWorld from "../components/hello_world.tsx";
import lorem from "@devtool/lorem";

/**
 * Home Page.
 */
export default function View() {
  return (
    <div>
      <h1>Home Page</h1>
      <HelloWorld title="Hello World" />
      {lorem.s(4)}
    </div>
  );
}
