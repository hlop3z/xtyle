// @ts-nocheck
// import "./backend";
// import "./model";

import * as xtyle from "../pre-build";

export default function App(props: any) {
  const demoSignal = preact.useSignal("hello_world");
  preact.useEffect(() => {
    console.log(demoSignal);
  }, [demoSignal.value]);
  return (
    <div x-html x-demo>
      <xtyle.router.views />

      <x-slot x-if={true}>
        {/* <HelloWorld /> */}
        <br />
        <br />
        <x-slot
          x-for={(item) => (
            <button x-html on-click={() => xtyle.router.go(item)}>
              Go {item}
            </button>
          )}
          x-in={[
            "/",
            "about-us",
            "home",
            "not-found-1",
            "not-found-2",
            "not-found-3",
          ]}
        ></x-slot>
        <button x-html on-click={() => xtyle.router.go("/home")}>
          Go To Route
        </button>
        <button
          x-html
          on-click={() => xtyle.router.go("/about-us/view/long-name")}
        >
          Go Other Route
        </button>
        <button x-html on-click={() => xtyle.router.go(null, { key: "value" })}>
          Same But With Different Query
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
        <div>
          <input x-html type="file" x-value={demoSignal}></input>
        </div>
        <br />
        <br />
        <div x-html theme-text="danger-dark">
          Text-Color
        </div>
        <br />
        <div x-html theme-color="danger-light">
          Background-Color
        </div>
        <br />
        <div x-html theme-border="danger" style="border: 6px solid;">
          Border-Color
        </div>
        <div x-html theme-text="danger-dark">
          Text-Color
        </div>
        <br />
        <br />
        <table x-html theme-table="danger-dark">
          <thead>
            <tr>
              <th colspan="3">The table header</th>
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
      </x-slot>
      <div
        x-html
        x-click-outside={() => console.log("clicked outside")}
        style="border: 2px solid black;"
        key={JSON.stringify(xtyle.device)}
      >
        {JSON.stringify(xtyle.device)}
        <h2>Click Outside</h2>
        <div>
          Child
          <div>Sub-Child</div>
        </div>
      </div>
    </div>
  );
}
