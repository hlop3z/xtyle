/* DevTools */
import lorem from "../../devtool/lorem";

/**
 * Home Page.
 */
export default function View() {
  return (
    <div>
      <h1>Home Page</h1>
      <x-theme-hello-world title="Hello World" />
      <br />
      {lorem.sentence(4)}
    </div>
  );
}
