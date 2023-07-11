export default function createDirectives(util) {
  const BuiltinDirectives = {
    resize: (self, props) => {
      util.event(window, "resize", (event) =>
        props.xResize({ self, event, props })
      );
    },
    "click-outside": (self, props) => {
      console.log(self);
      util.event(document, "click", function (event) {
        const isClickInsideElement = self.ref.current.contains(event.target);
        if (!isClickInsideElement) {
          props.xClickOutside({ self, event, props });
        }
      });
    },
    scroll: (self, props) => {
      const handler = (event) => {
        props.xScroll({
          offset: {
            x: event.target.scrollLeft,
            y: event.target.scrollTop,
          },
          self,
          event,
          props,
        });
      };
      util.event(self.ref, "scroll", handler);
    },
    /*
    noselect: (self) => {
      preact.useEffect(() => {
        self.ref.add("xtyle-no-select");
      }, []);
      return null;
    },
    pointer: (self) => {
      preact.useEffect(() => {
        self.ref.add("xtyle-cursor-pointer");
      }, []);
      return null;
    },
    */
  };

  // Directives
  return (directives) => {
    const items = directives ? directives : {};
    util.directives.method = util.directives.create({
      ...BuiltinDirectives,
      ...items,
    });
  };
}
