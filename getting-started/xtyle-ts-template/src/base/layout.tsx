import "./style.css";
import HelloWorld from "../components/HelloWorld.tsx";

/**
 * My Custom Component.
 * @param {any} props - The props of the component.
 */
function App() {
  /* Layout Admin */
  let layout: any = {};

  /* Menu */
  const menu: any = {
    home: () => xtyle.router.go({ path: "/" }),
    about: () => xtyle.router.go({ name: "custom", args: { view: "about" } }),
  };

  /* View */
  return (
    <xtyle.layout x-init={(self) => (layout = self)}>
      {/* <!-- Header --> */}
      <Fragment class="app-header" x-slot="header">
        Header
        <nav>
          <ul class="menu">
            {["left", "left-mini", "right", "right-mini"].map((item) => (
              <li onClick={() => layout.toggle(item)}>Toggle ({item})</li>
            ))}
          </ul>
        </nav>
      </Fragment>

      {/* <!-- Main --> */}
      <Fragment
        class="app-main"
        x-slot="main"
        clip-top
        clip-bottom
        clip-left
        clip-right
      >
        <HelloWorld title="Hello World" />
        <div class="router-menu">
          <button onClick={menu.home}>Home</button>
          <button onClick={menu.about}>About</button>
        </div>
        <div style="height: 40px"></div>
        {/* <!-- Router --> */}
        <xtyle.router.view />
      </Fragment>

      {/* <!-- Drawers --> */}
      <Fragment
        x-slot="left"
        class="open app-left"
        clip-top
        clip-bottom
        x-swipe={(e) => console.log(e)}
      >
        Left
      </Fragment>
      <Fragment x-slot="right" class="open app-right" clip-top clip-bottom>
        Right
      </Fragment>

      {/* <!-- Drawers (mini) --> */}
      <Fragment
        x-slot="left-mini"
        class="open app-mini-left"
        clip-top
        clip-bottom
      >
        Left-mini
      </Fragment>
      <Fragment
        x-slot="right-mini"
        class="open app-mini-right"
        clip-top
        clip-bottom
      >
        Right-mini
      </Fragment>

      {/* <!-- Footer --> */}
      <Fragment x-slot="footer" class="app-footer">
        Footer
      </Fragment>
    </xtyle.layout>
  );
}

export default App;
