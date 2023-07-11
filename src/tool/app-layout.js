export default function AppWrapper(util) {
  function _extends() {
    _extends = Object.assign
      ? Object.assign.bind()
      : function (target) {
          for (var i = 1; i < arguments.length; i++) {
            var source = arguments[i];
            for (var key in source) {
              if (Object.prototype.hasOwnProperty.call(source, key)) {
                target[key] = source[key];
              }
            }
          }
          return target;
        };
    return _extends.apply(this, arguments);
  }
  function getSectionProps(slots, key) {
    if (slots[key]) {
      return slots[key].props || {};
    }
    return {};
  }

  // Base
  const Layout = (args) => {
    const props = args;
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
    return h(
      util.element,
      _extends(
        {
          "x-tag": tag,
        },
        props
      )
    );
  };

  // Application
  function AppLayout(props) {
    const slots = util.slots(props);
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
      header: () =>
        h(
          Layout,
          _extends(
            {
              variant: "header",
            },
            _getProps("header")
          ),
          slots.$("header")
        ),
      footer: () =>
        h(
          Layout,
          _extends(
            {
              variant: "footer",
            },
            _getProps("footer")
          ),
          slots.$("footer")
        ),
      main: () =>
        h(
          Layout,
          _extends(
            {
              variant: "main",
            },
            _getProps("main")
          ),
          slots.$("main")
        ),
      left: () =>
        h(
          Layout,
          _extends(
            {
              variant: "left",
              "x-init": (self) => (admin.left = self),
            },
            _getProps("left")
          ),
          slots.$("left")
        ),
      right: () =>
        h(
          Layout,
          _extends(
            {
              variant: "right",
              "x-init": (self) => (admin.right = self),
            },
            _getProps("right")
          ),
          slots.$("right")
        ),
      leftMini: () =>
        h(
          Layout,
          _extends(
            {
              variant: "left",
              mini: true,
              "x-init": (self) => (admin.leftMini = self),
            },
            _getProps("leftMini")
          ),
          slots.$("leftMini")
        ),
      rightMini: () =>
        h(
          Layout,
          _extends(
            {
              variant: "right",
              mini: true,
              "x-init": (self) => (admin.rightMini = self),
            },
            _getProps("rightMini")
          ),
          slots.$("rightMini")
        ),
    };
    const doRender = (name) =>
      !slots.$keys.includes(name) ? null : section[name]();
    const view = h(
      Fragment,
      null,
      doRender("header"),
      doRender("main"),
      doRender("left"),
      doRender("right"),
      doRender("leftMini"),
      doRender("rightMini"),
      doRender("footer")
    );
    return view;
  }

  // Component
  return AppLayout;
}
