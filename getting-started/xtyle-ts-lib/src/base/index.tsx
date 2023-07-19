import "./style.scss";

/**
 * App Layout.
 */
export default function App() {
  /* Layout Admin */
  let layout: any = {};

  /* Tools */
  const toggleSide = (key: string, value: any = null) =>
    layout.toggle(key, value);

  /* View */
  return (
    <xtyle.layout x-init={(self: any) => (layout = self)}>
      {/* <!-- Header --> */}
      <Fragment class="app-header" x-slot="header">
        <Header toggle={toggleSide} />
      </Fragment>

      {/* <!-- Main --> */}
      <Fragment class="app-main" x-slot="main" clip-top clip-bottom>
        <Main toggle={toggleSide} />
      </Fragment>

      {/* <!-- Drawers --> */}
      <Fragment
        x-slot="left"
        class="open app-left"
        clip-top
        clip-bottom
        x-swipe={(e) => console.log(e)}
      >
        <SideLeft toggle={toggleSide} />
      </Fragment>
      <Fragment x-slot="right" class="open app-right" clip-top clip-bottom>
        <SideRight toggle={toggleSide} />
      </Fragment>

      {/* <!-- Drawers (mini) --> */}
      <Fragment
        x-slot="left-mini"
        class="open app-mini-left"
        clip-top
        clip-bottom
      >
        <MiniLeft toggle={toggleSide} />
      </Fragment>
      <Fragment
        x-slot="right-mini"
        class="open app-mini-right"
        clip-top
        clip-bottom
      >
        <MiniRight toggle={toggleSide} />
      </Fragment>

      {/* <!-- Footer --> */}
      <Fragment x-slot="footer" class="app-footer">
        <Footer toggle={toggleSide} />
      </Fragment>
    </xtyle.layout>
  );
}

const Header = ({ toggle }) => {
  /* Menu */
  const menu: any = {
    home: () => xtyle.router.go({ path: "/" }),
    about: () => xtyle.router.go({ name: "custom", args: { view: "about" } }),
  };
  return (
    <Fragment>
      <button onClick={menu.home}>Home</button>
      <button onClick={menu.about}>About</button>
      <nav>
        <ul class="menu">
          {["left", "left-mini", "right", "right-mini"].map((item) => (
            <li onClick={() => toggle(item)}>Toggle ({item})</li>
          ))}
        </ul>
      </nav>
    </Fragment>
  );
};

const Main = (/* { toggle } */) => {
  return <xtyle.router.view />;
};

const Footer = (/* { toggle } */) => {
  return <Fragment>Footer</Fragment>;
};

const SideLeft = (/* { toggle } */) => {
  return <Fragment>Left</Fragment>;
};

const SideRight = (/* { toggle } */) => {
  return <Fragment>Right</Fragment>;
};

const MiniLeft = (/* { toggle } */) => {
  return <Fragment>Mini-Left</Fragment>;
};

const MiniRight = (/* { toggle } */) => {
  return <Fragment>Mini-Right</Fragment>;
};
