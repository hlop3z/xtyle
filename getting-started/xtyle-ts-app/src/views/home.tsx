/* DevTools */
import lorem from "../../devtool/lorem";

/* Components */
const { HelloWorld } = theme;

/**
 * Home Page.
 */
export default function View() {
  return (
    <div>
      <h1>Home Page</h1>
      <HelloWorld title="Hello World" />
      {lorem.sentence(4)}
    </div>
  );
}
