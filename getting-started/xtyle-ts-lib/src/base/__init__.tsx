import "./style.scss";
import Main from "./main.tsx";
import Header from "./header.tsx";
import Footer from "./footer.tsx";
import SideLeft from "./side-left.tsx";
import SideRight from "./side-right.tsx";
import MiniLeft from "./mini-left.tsx";
import MiniRight from "./mini-right.tsx";

/**
 * App Layout.
 */
function App() {
  /* Layout Admin */
  let layout: any = {};

  /* Tools */
  const toggleSide = (val: string) => layout.toggle(val);

  /* View */
  return (
    <xtyle.layout x-init={(self: any) => (layout = self)}>
      {/* <!-- Header --> */}
      <Fragment class="app-header" x-slot="header">
        <Header toggle={toggleSide} />
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
        <Main />
      </Fragment>

      {/* <!-- Drawers --> */}
      <Fragment
        x-slot="left"
        class="open app-left"
        clip-top
        clip-bottom
        x-swipe={(e) => console.log(e)}
      >
        <SideLeft />
      </Fragment>
      <Fragment x-slot="right" class="open app-right" clip-top clip-bottom>
        <SideRight />
      </Fragment>

      {/* <!-- Drawers (mini) --> */}
      <Fragment
        x-slot="left-mini"
        class="open app-mini-left"
        clip-top
        clip-bottom
      >
        <MiniLeft />
      </Fragment>
      <Fragment
        x-slot="right-mini"
        class="open app-mini-right"
        clip-top
        clip-bottom
      >
        <MiniRight />
      </Fragment>

      {/* <!-- Footer --> */}
      <Fragment x-slot="footer" class="app-footer">
        <Footer />
      </Fragment>
    </xtyle.layout>
  );
}

export default App;
