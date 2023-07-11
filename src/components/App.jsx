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
    // util.router.view
    // util.router.current
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

function getSectionProps(slots, key) {
  if (slots[key]) {
    return slots[key].props || {};
  }
  return {};
}
const Layout = (args) => {
  /*
  {Header} -  lt
  {Footer} -  lb
  {Main} -  lm lc-l lc-r lc-t lc-b
  {Drawer-Left} - ll ld lc-t lc-b
  {Drawer-Right} - lr ld lc-t lc-b
  {DrawersMini} -  mini
  */
  const props = args;
  // Classes
  props.class = [
    [
      {
        lt: args.variant === "header",
        lb: args.variant === "footer",
        lm: args.variant === "main",
        "ll ld": args.variant === "left",
        "lr ld": args.variant === "right",
        "lc-t": args["clip-top"],
        "lc-b": args["clip-bottom"],
        "lc-l": args["clip-left"],
        "lc-r": args["clip-right"],
        mini: args.mini,
      },
    ],
    args.class,
  ];
  // Tag
  let tag = "aside";
  switch (args.variant) {
    case "header":
      tag = "div";
      break;
    case "main":
      tag = "main";
      break;
    case "footer":
      tag = "footer";
      break;
  }
  return <xtyle.element x-tag={tag} {...props}></xtyle.element>;
};

function AppLayout(props) {
  const slots = xtyle.slots(props);
  const admin = {
    left: {},
    right: {},
    leftMini: {},
    rightMini: {},
    // Methods
    toggle(side = "left", value = null) {
      admin[side].ref.toggle(["open"], value);
    },
  };
  Object.defineProperty(admin, "left-mini", {
    get() {
      return this.leftMini;
    },
  });
  Object.defineProperty(admin, "right-mini", {
    get() {
      return this.rightMini;
    },
  });
  if (props["x-init"]) {
    preact.useEffect(() => {
      props["x-init"](admin);
    }, [props]);
  }
  const _getProps = (p) => getSectionProps(slots, p);
  const section = {
    header: () => (
      <Layout variant="header" {..._getProps("header")}>
        {slots.$("header")}
      </Layout>
    ),
    footer: () => (
      <Layout variant="footer" {..._getProps("footer")}>
        {slots.$("footer")}
      </Layout>
    ),
    main: () => (
      <Layout variant="main" {..._getProps("main")}>
        {slots.$("main")}
      </Layout>
    ),
    left: () => (
      <Layout
        variant="left"
        x-init={(self) => (admin.left = self)}
        {..._getProps("left")}
      >
        {slots.$("left")}
      </Layout>
    ),
    right: () => (
      <Layout
        variant="right"
        x-init={(self) => (admin.right = self)}
        {..._getProps("right")}
      >
        {slots.$("right")}
      </Layout>
    ),
    leftMini: () => (
      <Layout
        variant="left"
        mini
        x-init={(self) => (admin.leftMini = self)}
        {..._getProps("leftMini")}
      >
        {slots.$("leftMini")}
      </Layout>
    ),
    rightMini: () => (
      <Layout
        variant="right"
        mini
        x-init={(self) => (admin.rightMini = self)}
        {..._getProps("rightMini")}
      >
        {slots.$("rightMini")}
      </Layout>
    ),
  };

  const doRender = (name) =>
    !slots.$keys.includes(name) ? null : section[name]();

  return (
    <Fragment>
      {/* <!-- Header --> */}
      {doRender("header")}

      {/* <!-- Main --> */}
      {doRender("main")}

      {/* <!-- Drawers --> */}
      {doRender("left")}
      {doRender("right")}

      {/* <!-- Drawers (mini) --> */}
      {doRender("leftMini")}
      {doRender("rightMini")}

      {/* <!-- Footer --> */}
      {doRender("footer")}
    </Fragment>
  );
}

function App() {
  let admin = {};
  return (
    <AppLayout x-init={(self) => (admin = self)}>
      {/* <!-- Header --> */}
      <Fragment x-slot="header">
        <button onClick={() => admin.toggle("left")}>Toggle Left</button>
        Header
        <button onClick={() => admin.toggle("right-mini")}>Toggle Right</button>
      </Fragment>

      {/* <!-- Main --> */}
      <Fragment x-slot="main" clip-top clip-bottom clip-left clip-right>
        <br />
        <button onClick={() => xtyle.router.go({ path: "/" })}>Home</button>
        <button
          onClick={() =>
            xtyle.router.go({ name: "custom", args: { view: "about" } })
          }
        >
          About
        </button>
        <br />
        <br />
        <xtyle.router.view />
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
    </AppLayout>
  );
}

preact.render(preact.h(App), document.body);

export default App;
