import lorem from "@devtool/lorem";
import xtyle from "@tool/index";

const Routes = [
  { path: "/", name: "home", view: () => h("div", {}, "Home View") },
  {
    path: "/{view}",
    name: "custom",
    view: () => h("div", {}, "About View"),
  },
];

const Config = {
  directives: {},
  router: {
    history: true,
    routes: Routes,
    before: ({ from, to, next }) => next(),
    after: ({ from, to }) => console.log(from, to),
  },
  layout: {
    // Sizes
    header: "50px",
    footer: "40px",
    right: "185px",
    left: "185px",
    leftMini: "60px",
    rightMini: "60px",
    // Layers
    headerLayer: 2,
    footerLayer: 2,
    leftLayer: 1,
    rightLayer: 1,
  },
};

// Customize
xtyle.createApp(Config);

xtyle.inject(`
.lt, .lb, .ll, .lr {
  border: 1px solid black;
}
.ll {
  text-align: right;
}
.lm, .lt {
  text-align: center;
}
button { margin: 0 8px; }
`);

function App() {
  let admin = {};
  const menu = {
    home: () => xtyle.router.go({ path: "/" }),
    about: () => xtyle.router.go({ name: "custom", args: { view: "about" } }),
  };
  return (
    <xtyle.layout x-init={(self) => (admin = self)}>
      {/* <!-- Header --> */}
      <Fragment x-slot="header">
        <button onClick={() => admin.toggle("left")}>Toggle Left</button>
        Header
        <button onClick={() => admin.toggle("right-mini")}>Toggle Right</button>
      </Fragment>

      {/* <!-- Main --> */}
      <Fragment x-slot="main" clip-top clip-bottom clip-left clip-right>
        <br />
        <button onClick={menu.home}>Home</button>
        <button onClick={menu.about}>About</button>
        <br />
        <br />
        {demoSignal.value.status}
        <xtyle.router.view />
        {lorem.s(100)}
      </Fragment>

      {/* <!-- Drawers --> */}
      <Fragment
        x-slot="left"
        class="open"
        clip-top
        clip-bottom
        x-swipe={(e) => console.log(e)}
      >
        Left
      </Fragment>
      <Fragment x-slot="right" class="open" clip-top clip-bottom>
        Right
      </Fragment>

      {/* <!-- Drawers (mini) --> */}
      <Fragment x-slot="left-mini" class="open" clip-top clip-bottom>
        Left-mini
      </Fragment>
      <Fragment x-slot="right-mini" class="open" clip-top clip-bottom>
        Right-mini
      </Fragment>

      <Fragment x-slot="footer">Footer</Fragment>
    </xtyle.layout>
  );
}

const demoSignal = xtyle.signal({
  title: "Hello World",
  status: "open",
});

setTimeout(() => {
  demoSignal.update((draft) => {
    draft.status = "close";
  });
}, 1000);

preact.render(preact.h(App), document.body);

export default App;
