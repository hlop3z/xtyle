// @ts-nocheck
// import "./backend";
// import "./model";

import HelloWorld from "./views/hello-world";
import Value from "./views/value";

import * as xtyle from "../pre-build";

export default function App(props: any) {
  return (
    <div x-html>
      {/* <HelloWorld /> */}
      <Value />
      <br />
      <br />
      <button x-html on-click={() => xtyle.router.go("/home")}>
        Go To Route
      </button>
      <button
        x-html
        on-click={() => xtyle.router.go("/home", { key: "value" })}
      >
        Go To Route
      </button>
      <button
        x-html
        on-click={() =>
          xtyle.router.redirect("/about-us", false, { key: "value" })
        }
      >
        Redirect Local
      </button>
      <a
        x-html
        on-click={() => xtyle.router.redirect("http://localhost:5175", true)}
      >
        Redirect External
      </a>

      <br />
      <br />
      <table class="color-tb-info">
        <thead>
          <tr>
            <th colspan="2">The table header</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Alfreds Futterkiste</td>
            <td>Maria Anders</td>
            <td>Germany</td>
          </tr>
          <tr>
            <td>Centro comercial Moctezuma</td>
            <td>Francisco Chang</td>
            <td>Mexico</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
